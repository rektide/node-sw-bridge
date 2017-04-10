#!/usr/bin/env node
import { default as _quasilon} from "quasilon"
import { StringLiteral } from "babel-types"

const quasilon= _quasilon({sourceType: "module"})

export function Dictionary( o, options){
	const
	  className= o.name,
	  members= o.members.map( member=> new StringLiteral( member.name)),
	  memberTypes= o.members.map( member=> new StringLiteral(member.idlType.idlType)),
	  klass= quasilon`
		export class ${className}{
			static 
			constructor( options){
				Object.assign(this, options)
			}
			clone(){
				return new ${className}( this)
			}
			static get members(){
				return [${members}]
			}
			static getMemberTypes(){
				return [${memberTypes}]
			}
		}
		export default ${className}`
	return klass
}
export default Dictionary

if (typeof require !== "undefined" && require.main === module) {
	function field(name){
		return {
			type: "field",
			name,
			required: false,
			idlType: {
				sequence: false,
				generic: null,
				nullable: false,
				array: false,
				union: false,
				idlType: "ByteString"
			},
			extAttrs: []
		}
	}
	var result= Dictionary({
		name: "RequestInit",
		type: "dictionary",
		partial: false,
		members: [field("method"), field("headers")],
		inheritance: null,
		extAttrs: []
	})
	console.log( result.code)
}
