# HashMap Implementation 🗺️

Welcome to **Yet Another HashMap**—but this time, built from scratch! 🚀 This is a learning project for **The Odin Project (TOP)**.

## Features 🌟
- **Key-Value Storage** – Store your stuff like a real HashMap!
- **Collision Handling** – Using linked lists like a pro.
- **Dynamic Resizing** – Because running out of space is lame.
- **Basic CRUD** – Set, get, check existence, and remove keys.

## How to Use 🛠️
```js
import { HashMap } from "./HashMap.js";

const map = new HashMap();
map.set("apple", "red");
console.log(map.get("apple")); // "red"
map.remove("apple");
console.log(map.has("apple")); // false
```

## Notes 📌
- Only supports **string keys** (we keep it simple here).
- Resize happens when things get **too crowded**.

Happy coding! 😃

