#!/usr/bin/env node
import {
    addTask,
    updateTask,
    deleteTaskById,
    updateTaskStatus,
    tasks,
    filterTaskByStatus,
    TaskStatus,
} from "./manage-task";


const description = `
Task CLI - Manage your tasks
                
Usage:
    task-cli add "Task description"
    task-cli update <id> "Updated description"
    task-cli delete <id>
    task-cli mark-in-progress <id>
    task-cli mark-done <id>
    task-cli list [status (optional)]  status: todo | in-progress | done
`


const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "add": {
        const description = args.slice(1).join(" ");
        if (!description) {
            console.error("Error: Please provide a task description.");
            process.exit(1);
        }
        addTask(description);
        break;
    }

    case "update": {
        const id = Number(args[1]);
        const updatedTask = args.slice(2).join(" ");
        if (!id || !updatedTask) {
            console.error("Error: Provide task ID and updated description.");
            process.exit(1);
        }
        updateTask(id, updatedTask);
        break;
    }

    case "delete": {
        const id = Number(args[1]);
        if (!id) {
            console.error("Error: Provide task ID to delete.");
            process.exit(1);
        }
        deleteTaskById(id);
        break;
    }

    case "list": {
        const status = args[1];
        if (!status) {
            tasks();
        } else if (status === TaskStatus.Todo) {
            filterTaskByStatus(TaskStatus.Todo);
        } else if (status === TaskStatus.InProgress) {
            filterTaskByStatus(TaskStatus.InProgress);
        } else if (status === TaskStatus.Done) {
            filterTaskByStatus(TaskStatus.Done);
        } else {
            console.error("Error: Invalid status. Use todo | in-progress | done");
        }
        break;
    }

    case "mark-in-progress": {
        const id = Number(args[1]);
        if (!id) {
            console.error("Error: Provide task ID to mark in-progress.");
            process.exit(1);
        }
        updateTaskStatus(id, TaskStatus.InProgress);
        break;
    }

    case "mark-done": {
        const id = Number(args[1]);
        if (!id) {
            console.error("Error: Provide task ID to mark done.");
            process.exit(1);
        }
        updateTaskStatus(id, TaskStatus.Done);
        break;
    }

    case "--help":
    default: {
        console.log(description);
    }
}



