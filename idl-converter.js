#!/usr/bin/env node
import {default as quasilon} from "quasilon"
import {default as webidl} from "webidl2"
import { access, mkdir, readFile, writeFile} from "mz/fs"


export async function parseIdl( filename){
	const
	  filetext= await readFile( filename, "utf8"),
	  idl= webidl.parse( filetext)
	return idl
}

if (typeof require !== "undefined" && require.main === module){
	const
	  prettyJson= o=> JSON.stringify(o, null, "\t"),
	  convertFile= file=> parseIdl( file, dest),
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
