import { Model , Schema ,model, connection } from "mongoose"

interface TaskType {
    id_user : string,
    date: Date,
    task : string
    done: boolean
}
const modelSchema = new Schema<TaskType>({
    id_user: {type:String , required : true},
    date: {type: Date , required : true},
    task: {type:String , required : true},
    done: {type:Boolean , default: false}
})

const modelName = "list"

export default connection && connection.models[modelName] ?
connection.models[modelName] as Model<TaskType>
:
model(modelName , modelSchema)