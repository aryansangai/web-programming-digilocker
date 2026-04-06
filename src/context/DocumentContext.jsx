import { createContext, useContext, useState, useEffect } from 'react';

const DocumentContext = createContext(null);

const DEFAULT_DOCS = [
  { id: '1', name: '10th Marksheet', category: 'Education', type: 'cert', verified: true, uploadedAt: '2025-06-15' },
  { id: '2', name: '12th Marksheet', category: 'Education', type: 'cert', verified: true, uploadedAt: '2025-07-20' },
  { id: '3', name: 'Passport', category: 'Identity', type: 'id', verified: true, uploadedAt: '2025-08-10' },
  { id: '4', name: 'Driving License', category: 'Identity', type: 'license', verified: true, uploadedAt: '2025-09-05' },
];

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('digilocker_documents');
    if (stored) {
      setDocuments(JSON.parse(stored));
    } else {
      setDocuments(DEFAULT_DOCS);
      localStorage.setItem('digilocker_documents', JSON.stringify(DEFAULT_DOCS));
    }
  }, []);

  const persist = (docs) => {
    setDocuments(docs);
    localStorage.setItem('digilocker_documents', JSON.stringify(docs));
  };

  const addDocument = (doc) => {
    const newDoc = {
      ...doc,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString().split('T')[0],
      verified: !!(doc.name && doc.name.trim()),
    };
    persist([...documents, newDoc]);
    return newDoc;
  };

  const updateDocument = (id, updates) => {
    const updated = documents.map(d => d.id === id ? { ...d, ...updates } : d);
    persist(updated);
  };

  const deleteDocument = (id) => {
    persist(documents.filter(d => d.id !== id));
  };

  const stats = {
    total: documents.length,
    verified: documents.filter(d => d.verified).length,
    pending: documents.filter(d => !d.verified).length,
    recent: documents.filter(d => {
      const days = (Date.now() - new Date(d.uploadedAt).getTime()) / (1000 * 60 * 60 * 24);
      return days <= 30;
    }).length,
  };

  return (
    <DocumentContext.Provider value={{ documents, addDocument, updateDocument, deleteDocument, stats }}>
      {children}
    </DocumentContext.Provider>
  );
}

export const useDocuments = () => useContext(DocumentContext);
