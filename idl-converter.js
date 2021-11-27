#!/usr/bin/env node
import { access, mkdir, readFile, writeFile} from "fs/promises"
import isMain from "is-main"
import * as webidl from "webidl2"

export async function parseIdl( filename){
	const
	  filetext= await readFile( filename, "utf8"),
	  idl= webidl.parse( filetext)
	return idl
}

function main(){
	const
	  prettyJson= o=> JSON.stringify(o, null, "\t"),
	  convertFile= file=> parseIdl( file, dest).then( prettyJson),
	  destFile= file=> dest+ "/"+ file.substring( file.lastIndexOf( "/")+ 1, file.lastIndexOf(".idl"))+ ".js",
	  convertAndSave= file=> convertFile( file).then( filetext=> writeFile( destFile( file), filetext), console.error)
	const
	  dest= process.argv[2],
	  files= process.argv.slice(3),
	  dirMk= access( dest).catch(()=> mkdir( dest))
	async function run(){
		await dirMk
		return files.forEach( convertAndSave)
	}
	run()
}

if( isMain( import.meta)){
	main()
}
