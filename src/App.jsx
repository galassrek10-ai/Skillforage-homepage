import React, { useEffect, useState, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
        getAuth,
        signInWithCustomToken,
        signInAnonymously,
        onAuthStateChanged,
        signOut
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp
} from "firebase/firestore";

// --- CONFIGURAZIONE E UTILITY GLOBALI ---
// Le variabili globali fornite dall'ambiente Canvas sono usate qui
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Configurazione AI
const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
const MAX_RETRIES = 5;
// NOTE: we proxy Gemini requests via the local backend at `/api/generate`

// Inizializzazione Firebase
let app, auth, db;
try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (e) {
    import React, { useEffect, useState, useCallback } from "react";
    import { initializeApp } from "firebase/app";
    import {
        getAuth,
        signInWithCustomToken,
        signInAnonymously,
        onAuthStateChanged,
        signOut
    } from "firebase/auth";
    import {
      getFirestore,
      collection,
      addDoc,
      query,
      where,
      getDocs,
      serverTimestamp
    } from "firebase/firestore";

    // --- CONFIGURAZIONE E UTILITY GLOBALI ---
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

    // Configurazione AI
    const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';

    // Inizializzazione Firebase (safeguard se config è vuota)
    let app, auth, db;
    try {
        if (Object.keys(firebaseConfig).length) {
          app = initializeApp(firebaseConfig);
          auth = getAuth(app);
          db = getFirestore(app);
        }
    } catch (e) {
        console.error("Errore di inizializzazione Firebase:", e);
    }


    const App = () => {
      const [user, setUser] = useState(null);
      const [userId, setUserId] = useState(null);
      const [isAuthReady, setIsAuthReady] = useState(!auth);
      const [role, setRole] = useState("");
      const [level, setLevel] = useState("");
      const [path, setPath] = useState("");
      const [history, setHistory] = useState([]);
      const [chat, setChat] = useState([]);
      const [input, setInput] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);

      // 1. Gestione dell'Autenticazione Firebase (solo se auth è disponibile)
      useEffect(() => {
        if (!auth) return;

        const handleAuth = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (e) {
                console.error("Errore nell'autenticazione Firebase:", e);
                setError("Errore di autenticazione. Riprova.");
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                setUser(u);
                setUserId(u.uid);
                loadHistory(u.uid);
            } else {
                setUser(null);
                setUserId(null);
            }
            setIsAuthReady(true);
        });

        handleAuth();
        return () => unsubscribe();
      }, []);

      // 2. Carica percorsi salvati da Firestore
      const loadHistory = useCallback(async (uid) => {
        if (!db || !uid) return;
        try {
            const historyCollectionRef = collection(db, `artifacts/${appId}/users/${uid}/paths`);
            const q = query(historyCollectionRef, where("uid", "==", uid));
            const snap = await getDocs(q);
            const loadedHistory = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            loadedHistory.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setHistory(loadedHistory);
        } catch(e) {
            console.error("Errore nel caricamento della cronologia:", e);
        }
      }, [db]);

      // 3. Funzione per generare il percorso con l'AI
      const generatePath = useCallback(async () => {
        if (!role.trim() || !level.trim()) {
            setError("Per favore, inserisci un ruolo e un livello.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setPath("");
        setChat([]);

        const userQuery = `Crea un percorso di apprendimento dettagliato in 5 fasi per un professionista nel ruolo di "${role}" con livello di esperienza "${level}". Includi: 1) Obiettivi, 2) Competenze chiave, 3) Risorse consigliate, 4) Esercizi pratici (simulazioni), 5) Criteri di valutazione finali. Rispondi usando esclusivamente il formato Markdown.`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: {
                parts: [{ text: "Sei SkillForge AI, un coach e mentore esperto. Genera un percorso di apprendimento strutturato in lingua italiana in base alla richiesta dell'utente." }]
            },
        };

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: GEMINI_MODEL, payload })
            });

            if (!response.ok) throw new Error(`Errore API: ${response.status} ${response.statusText}`);
        
            const result = await response.json();
            const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text || "Errore nella generazione del percorso.";

            setPath(generatedText);

            if (db && userId) {
              const historyCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/paths`);
              await addDoc(historyCollectionRef, {
                  uid: userId,
                  role,
                  level,
                  content: generatedText,
                  createdAt: serverTimestamp()
              });
              loadHistory(userId);
            }

        } catch (e) {
            console.error("Errore durante la generazione AI:", e);
            setError(`Errore: ${e.message}. Verifica che il server proxy sia in esecuzione e che GEMINI_API_KEY sia impostata.`);
        } finally {
            setIsLoading(false);
        }
      }, [role, level, userId, db, loadHistory]);

            // 4. Chat: invia il messaggio al proxy e mostra la risposta AI
            const sendMessage = async () => {
                if (!input.trim()) return;

                const messageText = input.trim();
                const userMsg = { from: "user", text: messageText };
                setChat((prev) => [...prev, userMsg]);
                setInput("");
                setIsLoading(true);

                try {
                    const payload = {
                        contents: [{ parts: [{ text: messageText }] }],
                        systemInstruction: {
                            parts: [{ text: "Sei SkillForge AI, rispondi in italiano in modo chiaro e conciso come assistente di coaching." }]
                        }
                    };

                    const response = await fetch('/api/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ model: GEMINI_MODEL, payload })
                    });

                    if (!response.ok) throw new Error(`API error ${response.status}`);

                    const result = await response.json();
                    const aiText = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Mi dispiace, non ho una risposta al momento.';
                    setChat((prev) => [...prev, { from: 'ai', text: aiText }]);
                } catch (err) {
                    console.error('Chat error', err);
                    setChat((prev) => [...prev, { from: 'ai', text: 'Errore nella generazione della risposta.' }]);
                } finally {
                    setIsLoading(false);
                }
            };
  
      const handleSignOut = () => {
          if (auth) signOut(auth).catch(e => console.error("Errore logout:", e));
      }

      // --- RENDERING ---
      const buttonClasses = "py-2 px-4 rounded-lg font-semibold transition-all duration-200 shadow-md";
      const primaryButtonClasses = `${buttonClasses} bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300`;
      const secondaryButtonClasses = `${buttonClasses} bg-gray-200 text-gray-800 hover:bg-gray-300`;
      const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm";
      const cardClasses = "bg-white p-6 rounded-xl shadow-xl w-full";
  
      if (!isAuthReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-4">SkillForge AI</h1>
                    <p className="text-gray-600">Caricamento e autenticazione in corso...</p>
                    <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                </div>
            </div>
        );
      }

      // If auth exists but user not signed, show prompt; if no auth configured, proceed in demo mode
      if (auth && !user) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-sm">
              <h1 className="text-3xl font-bold text-indigo-600 mb-4">SkillForge AI</h1>
              <p className="text-gray-600 mb-6">Accedi per generare percorsi di apprendimento personalizzati.</p>
              <button onClick={() => {}} className={primaryButtonClasses} disabled>Login non disponibile</button>
              <p className="text-xs text-red-500 mt-3">Auth attiva ma senza token in questo ambiente.</p>
            </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
          <header className="flex justify-between items-center py-4 px-6 bg-white rounded-xl shadow-md mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">SkillForge AI</h2>
            <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm hidden sm:block">Utente: {userId || 'Demo'}</span>
                <button onClick={handleSignOut} className={secondaryButtonClasses}>Logout</button>
            </div>
          </header>
      
          {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p className="font-semibold">Errore:</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
            <section className="lg:col-span-2 space-y-6">
                <div className={cardClasses}>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Genera Nuovo Percorso di Apprendimento</h3>
                    <div className="space-y-3">
                        <input
                            placeholder="Ruolo (es. Sales Manager, Frontend Dev)"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={inputClasses}
                            disabled={isLoading}
                        />
                        <input
                            placeholder="Livello di Esperienza (Junior, Mid, Senior)"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className={inputClasses}
                            disabled={isLoading}
                        />
                        <button onClick={generatePath} className={primaryButtonClasses} disabled={isLoading || !role.trim() || !level.trim()}>
                            {isLoading ? 'Generazione in corso...' : 'Genera Percorso con AI'}
                        </button>
                    </div>
                </div>
            
                <div className={cardClasses}>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Risultato del Percorso</h3>
                    <div className="min-h-[200px] p-4 bg-gray-50 border border-gray-200 rounded-lg overflow-auto">
                        {isLoading ? (
                             <div className="text-center py-10 text-gray-500">
                                <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-2">L'AI sta creando il tuo percorso...</p>
                            </div>
                        ) : path ? (
                            <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                               <pre className="font-sans text-sm">{path}</pre>
                            </div>
                        ) : (
                            <p className="text-gray-400">Inserisci i dati per generare il tuo primo percorso di crescita.</p>
                        )}
                    </div>
                </div>
            </section>

            <div className="lg:col-span-1 space-y-6">
                <div className={cardClasses}>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Storico Percorsi Salvati</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {history.length > 0 ? (
                            history.map((h, i) => (
                                <div key={h.id || i} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm cursor-pointer hover:bg-indigo-100 transition-colors" onClick={() => setPath(h.content)}>
                                    <p className="font-bold text-indigo-800">{h.role} ({h.level})</p>
                                    <p className="text-xs text-gray-500">{h.createdAt?.toDate?.()?.toLocaleDateString('it-IT') || 'Data non disponibile'}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm">Nessun percorso salvato. Generane uno!</p>
                        )}
                    </div>
                </div>

                <div className={cardClasses}>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Simulazione (Mock)</h3>
                    <div className="flex flex-col space-y-3">
                        <div className="h-48 p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto space-y-2 mb-3">
                            {chat.length === 0 ? (
                                <p className="text-gray-400 text-sm">Inizia la simulazione di "Cliente Difficile" (Mock).</p>
                            ) : (
                                chat.map((m, i) => (
                                    <div key={i} className={`text-sm ${m.from === "user" ? 'text-right' : 'text-left'}`}>
                                        <span className={`inline-block p-2 rounded-lg max-w-[80%] ${m.from === "user" ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-800'}`}>{m.text}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <input placeholder="Rispondi..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className={inputClasses} />
                        <button onClick={sendMessage} className={primaryButtonClasses}>Invia Messaggio (Mock)</button>
                    </div>
                </div>

            </div>
          </div>
        </div>
      );
    };

    export default App;