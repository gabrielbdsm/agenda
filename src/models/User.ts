import {connection,model,Model,Schema} from "mongoose";

interface  UserType  {
username : string,
email: string,
password: string
}

const modelSchema = new Schema<UserType>(
{
username : {type : String ,required: true},
email : {type : String , required : true},
password : {type:String ,required: true}
})

const modelName ="users"

export default connection && connection.models[modelName] ?
connection.models[modelName] as Model<UserType>
:
model(modelName , modelSchema)