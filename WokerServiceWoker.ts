import { EventTarget} from "event-target-shim"

type SSOOrArray = Array<any> | StructuredSerializeOptions

class WokerServiceWorker extends EventTarget implements ServiceWorker{
	scriptURL= null
	state= null
	onstatechange= null
	onerror= null
	postMessage(message: any, options?: SSOOrArray) {
	}
}
