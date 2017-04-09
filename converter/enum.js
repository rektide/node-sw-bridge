import { default as _quasilon} from "quasilon"

const quasilon = _quasilon()

export class Enum {
}

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
	  klass= quasilon`class ${className} extends String {
		constructor( n){
			super( typeof n=== "number"? ${className}[ n]: n)
		}
		get values(){
			return []
		}
	  };\n${byName}\n${byValue}`
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
