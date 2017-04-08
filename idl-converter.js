#!/usr/bin/env node
import {default as quasilon} from "quasilon"
import {default as webidl} from "webidl2"
import { readFile} from "mz/fs"


export async function parseIdl( filename){
	const
	  filetext= await readFile( filename, "utf8"),
	  idl= webidl.parse( filetext)
	return idl
}

if (typeof require !== "undefined" && require.main === module){
	const
	  dest= process.argv[2],
	  files= process.argv.slice(3),
	  prettyJson= o=> JSON.stringify(o, null, "\t"),
	  convertFile= file=> parseIdl( file, dest).then( prettyJson).then( console.log, console.error)
	files.forEach( convertFile)
}
