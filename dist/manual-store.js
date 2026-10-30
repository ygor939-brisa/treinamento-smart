(function () {
  const DB_NAME = "TreinamentoSmartDB";
  const DB_VERSION = 1;
  const STORE_NAME = "manuals";

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const store = database.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("category", "category", { unique: false });
          store.createIndex("technology", "technology", { unique: false });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function transact(mode, action) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, mode);
      const store = transaction.objectStore(STORE_NAME);
      const request = action(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      transaction.oncomplete = () => database.close();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  window.ManualStore = {
    list: () => transact("readonly", (store) => store.getAll()),
    add: (manual) => transact("readwrite", (store) => store.put(manual)),
    remove: (id) => transact("readwrite", (store) => store.delete(id)),
    get: (id) => transact("readonly", (store) => store.get(id)),
  };
})();
