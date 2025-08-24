import { join } from "path";
import { existsSync, writeFileSync, readFileSync } from "fs";

const filePath = join(__dirname, "task.json"); // keep file in current dir

export interface Task {
    id: number;
    description: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
}

export enum TaskStatus {
    InProgress = "in-progress",
    Todo = "todo",
    Done = "done",
}

interface Tasks {
    version: string;
    description: string;
    tasks: Task[];
}

export function addTask(description: string): void {
    createTaskFile();
    const data = readTaskFile();

    const newTask: Task = {
        id: getNextTaskId(data.tasks),
        description,
        status: TaskStatus.Todo,
        createdAt: now(),
        updatedAt: now(),
    };

    const tasks = [...data.tasks, newTask];
    writeTaskFile(JSON.stringify({ ...data, tasks }, null, 2));

    console.log(`Task added successfully (ID: ${newTask.id})`);
}

export function updateTask(id: number, updatedTask: string): void {
    const data = readTaskFile();

    ifTaskNotExistThrowException(id, data.tasks)

    const newTasks = data.tasks.map((task) =>
        task.id === id
            ? { ...task, description: updatedTask, updatedAt: new Date().toISOString() }
            : task
    );
    writeTaskFile(JSON.stringify({ ...data, tasks: newTasks }, null, 2));
    console.log(`Task updated successfully (ID: ${id})`);
}

export function deleteTaskById(id: number): void {
    const data = readTaskFile();

    ifTaskNotExistThrowException(id, data.tasks)

    const newTasks = data.tasks.filter((task) => task.id !== id);
    writeTaskFile(JSON.stringify({ ...data, tasks: newTasks }, null, 2));
    console.log(`Task deleted successfully (ID: ${id})`);
}

export function tasks(): void {
    const data = readTaskFile();
    if (data.tasks.length === 0) {
        console.log("No tasks found.");
    }
    else{
        console.log("Your tasks\n--------------------------------")
        console.log(data);
    }
}

export function updateTaskStatus(id: number, status: TaskStatus): void {
    const data = readTaskFile();

    ifTaskNotExistThrowException(id, data.tasks)

    const newTasks = data.tasks.map((task) =>
        task.id === id
            ? { ...task, status, updatedAt: new Date().toISOString() }
            : task
    );
    writeTaskFile(JSON.stringify({ ...data, tasks: newTasks }, null, 2));
    console.log(`Task (ID: ${id}) marked as ${status}`);
}

export function filterTaskByStatus(status: TaskStatus): void {
    const data = readTaskFile();
    const filtered = data.tasks.filter((task) => task.status === status);
    if (filtered.length === 0) {
        console.log(`No tasks found with status: ${status}`);
    } else {
        console.log("Your tasks\n--------------------------------")
        console.log(filtered);
    }
}

function readTaskFile(): Tasks {
    if(!existsSync(filePath)){
        console.log("No file exists");
        process.exit(1);
    }
    return JSON.parse(readFileSync(filePath, "utf-8")) as Tasks;
}

function writeTaskFile(data: string): void {
    writeFileSync(filePath, data, { encoding: "utf-8" });
}

function createTaskFile(): void {
    if (!existsSync(filePath)) {
        const initData: Tasks = {
            version: "1.0.0",
            description: "Task list",
            tasks: [],
        };
        writeTaskFile(JSON.stringify(initData, null, 2));
    }
}


function isTaskExist(id: number, tasks: Task[]): boolean {
    return tasks.some((task) => task.id === id);
}

function ifTaskNotExistThrowException(id: number, tasks: Task[]): void {
    if(!isTaskExist(id, tasks)) {
        console.log(`Task with id ${id} does not exist`);
        process.exit(1);
    }
}

function getNextTaskId(tasks: Task[]): number {
    return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

function now(): string {
    return new Date().toISOString();
}
