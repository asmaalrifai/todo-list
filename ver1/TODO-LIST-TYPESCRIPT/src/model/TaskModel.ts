import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
    id: string;
    item: string;
    checked: boolean;
}

const TaskSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    item: { type: String, required: true },
    checked: { type: Boolean, required: true }
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
