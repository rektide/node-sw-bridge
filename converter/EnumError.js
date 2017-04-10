export class EnumError extends Error{
	constructor( msg, value){
		super( msg)
		this.value= value
	}
}
export default EnumError
