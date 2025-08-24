# 📋 Task Tracker CLI

A simple **Command Line Interface (CLI)** tool to track what you need to do, what you’re currently working on, and what you’ve completed.

This project helps you practice **programming, working with the filesystem, handling user input, and building CLI tools**.

---

## 🚀 Features

* ➕ **Add** new tasks
* ✏️ **Update** existing tasks
* 🗑️ **Delete** tasks by ID
* 🔄 **Mark** tasks as `in-progress` or `done`
* 📜 **List** all tasks
* 🎯 **Filter** tasks by status: `todo`, `in-progress`, `done`
* 💾 **Persistent storage** in a local JSON file

---

## 📦 Requirements & Constraints

* Runs directly from the **command line**
* Uses **positional arguments** for commands
* Stores tasks in a **JSON file** (`task.json`) in the project directory
* Automatically **creates `task.json`** if it does not exist
* Uses only the **native file system module** (no DB or external frameworks)
* Handles **errors and edge cases gracefully**

---

## 🏗️ Task Properties

Each task in `task.json` contains:

| Property      | Type   | Description                              |
| ------------- | ------ | ---------------------------------------- |
| `id`          | number | Unique identifier for the task           |
| `description` | string | Short description of the task            |
| `status`      | string | One of `todo`, `in-progress`, `done`     |
| `createdAt`   | string | ISO timestamp when task was created      |
| `updatedAt`   | string | ISO timestamp when task was last updated |

Example `task.json`:

```json
{
  "version": "1.0.0",
  "description": "Task list",
  "tasks": [
    {
      "id": 1,
      "description": "Buy groceries",
      "status": "todo",
      "createdAt": "2025-08-24T12:00:00.000Z",
      "updatedAt": "2025-08-24T12:00:00.000Z"
    }
  ]
}
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash

git clone https://github.com/hossain95/task-cli.git
cd task-cli
```

### 2. Install dependencies

```bash

npm install
```

### 3. Build the project

```bash

npm run build
```

### 4. Link globally

```bash

npm link
```

Now you can run `task-cli` from anywhere in your terminal.

---

## 📖 Usage

Run the help command:

```bash

task-cli --help
```

## 🧪 Example Workflow

```bash

task-cli add "Learn TypeScript"
task-cli add "Build a CLI project"
task-cli list
task-cli mark-in-progress 2
task-cli list in-progress
task-cli mark-done 1
task-cli list done
```

## 📜 License