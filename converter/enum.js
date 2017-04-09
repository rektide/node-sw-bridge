import { default as _quasilon} from "quasilon"

const quasilon = _quasilon()

export class Enum {
}

export function RequestType( o, options){
	options= Object.assign({}, defaults, options)
	function makeValue( _name, i){
		const
		  name= options.nameNormalizer( _name, i),
		  value= options.valueNormalizer( i, name),
		  valueValue= value.constructor== String? JSON.stringify(value): value
		return `${className}.${name} = ${value};`
	}
	const
	  className= options.classNameNormalizer( o.name),
	  values= o.values.map( makeValue),
	  klass= `class ${className} extends Enum { }\n${values.join("\n")}`
	return quasilon`${klass}`
}

export let defaults= {
	classNameNormalizer: i=> i,
	nameNormalizer: i=> i,
	valueNormalizer: i=> i
}

if (typeof require !== "undefined" && require.main === module) {
	var result= RequestType({
		"name": "RequestType",
		"values": ["A", "B"],
		"extAttrs": []
	})
	console.log( JSON.stringify( result, null, "\t"))
}
