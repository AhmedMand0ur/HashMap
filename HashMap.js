export class HashMap {

    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity);
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
    }


    #_hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
    }



    set(key, value) {
        let hash = this.#_hash(key);
        let newNode = { key, value, next: null };

        if (!this.buckets[hash]) {
            this.buckets[hash] = newNode;
            this.size++;
            return;
        }

        let current = this.buckets[hash];

        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            }

            if (current.next === null) break;

            current = current.next;
        }

        current.next = newNode;
        this.size++;

        // Rehash if the load factor is exceeded
        if (this.size / this.capacity > this.loadFactor) {
            let entries = this.entries();
            this.capacity *= 2;
            this.buckets = new Array(this.capacity);
            this.size = 0;

            for (let { key, value } of entries) {
                this.set(key, value);
            }
        }

    }


    get(key) {
        let hash = this.#_hash(key);

        if (!this.buckets[hash]) return null;

        let current = this.buckets[hash];
        while (current) {
            if (current.key === key) return current.value;
            current = current.next;
        }
        return null;
    }


    has(key) {
        let hash = this.#_hash(key);

        if (!this.buckets[hash]) return false;

        let current = this.buckets[hash];
        while (current) {
            if (current.key === key) return true;
            current = current.next;
        }
        return false;
    }


    remove(key) {
        let hash = this.#_hash(key);

        if (!this.buckets[hash]) return;

        if (this.buckets[hash].key === key) {
            this.buckets[hash] = this.buckets[hash].next;
            this.size--;
            return;
        }

        let current = this.buckets[hash];
        while (current.next) {
            if (current.next.key === key) {
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }


    length() {
        return this.size;
    }


    clear() {
        this.buckets.fill(null);
        this.size = 0;
    }


    keys() {
        let keys = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                keys.push(current.key);
                current = current.next;
            }
        }
        return keys;
    }


    values() {
        let values = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                values.push(current.value);
                current = current.next;
            }
        }
        return values;
    }


    entries() {
        let entries = [];
        for (let i = 0; i < this.capacity; i++) {
            let current = this.buckets[i];
            while (current) {
                entries.push({ key: current.key, value: current.value });
                current = current.next;
            }
        }
        return entries;
    }

}