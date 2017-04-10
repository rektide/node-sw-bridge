import { default as _quasilon} from "quasilon"
import { StringLiteral } from "babel-types"

const quasilon = _quasilon({sourceType: "module"})

export function RequestType( o, options){
	options= Object.assign({}, defaults, options)
	function normalize( name, ordinal){
		var o= {name, ordinal}
		o.name= options.nameNormalize( o)
		o.ordinal= options.ordinalNormalize( o)
		return o
	}
	const
	  className= options.classNameNormalize( o.name),
	  normalized= o.values.map( normalize),
	  byName= normalized.map( o=> quasilon`${className}.${o.name}= ${o.ordinal.toString()}`.ast.program),
	  byValue= normalized.map( o=> quasilon`${className}[${o.ordinal.toString()}]= "${o.name}"`.ast.program),
	  values= normalized.map( o=> new StringLiteral(o.name)),
	  klass= quasilon`
		import EnumError from "./EnumError"
		export class ${className} extends String {
			constructor( n){
				super( typeof n=== "number"? ${className}[ n]: n)
				const lookup= ${className}[n]
				if( !lookup){
					throw new EnumError("Invalid value", n)
				}
			}
			get values(){
				return [ null, ${values}]
			}
			get ordinal(){
				return ${className}[this.toString()]
			}
		};
		export default ${className};
		${byName}
		${byValue}`
	return klass
}

export let defaults= {
	classNameNormalize: i=> i,
	nameNormalize: i=> i.name,
	ordinalNormalize: i=> i.ordinal+ 1
}

if (typeof require !== "undefined" && require.main === module) {
	var result= RequestType({
		"name": "RequestType",
		"values": ["A", "B"],
		"extAttrs": []
	})
	console.log( result.code)
}
