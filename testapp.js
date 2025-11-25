var $Module$$;
$Module$$ ||= typeof Module != 'undefined' ? Module : {};
var $ENVIRONMENT_IS_WEB$$ = "object" == typeof window, $ENVIRONMENT_IS_WORKER$$ = "undefined" != typeof WorkerGlobalScope, $ENVIRONMENT_IS_NODE$$ = "object" == typeof process && process.versions?.node && "renderer" != process.type, $ENVIRONMENT_IS_SHELL$$ = !$ENVIRONMENT_IS_WEB$$ && !$ENVIRONMENT_IS_NODE$$ && !$ENVIRONMENT_IS_WORKER$$, $arguments_$$ = [], $thisProgram$$ = "./this.program", $quit_$$ = ($status$$, $toThrow$$) => {
  throw $toThrow$$;
}, $_scriptName$$ = "undefined" != typeof document ? document.currentScript?.src : void 0;
"undefined" != typeof __filename ? $_scriptName$$ = __filename : $ENVIRONMENT_IS_WORKER$$ && ($_scriptName$$ = self.location.href);
var $scriptDirectory$$ = "", $readAsync$$, $readBinary$$;
if ($ENVIRONMENT_IS_NODE$$) {
  if ("object" != typeof process || !process.versions?.node || "renderer" == process.type) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var $nodeVersion$$ = process.versions.node, $numericVersion$$ = $nodeVersion$$.split(".").slice(0, 3);
  $numericVersion$$ = 1e4 * $numericVersion$$[0] + 100 * $numericVersion$$[1] + 1 * $numericVersion$$[2].split("-")[0];
  if (16e4 > $numericVersion$$) {
    throw Error("This emscripten-generated code requires node v16.0.0 (detected v" + $nodeVersion$$ + ")");
  }
  var fs = require("fs");
  $scriptDirectory$$ = __dirname + "/";
  $readBinary$$ = $filename$jscomp$15_ret$$ => {
    $filename$jscomp$15_ret$$ = $isFileURI$$($filename$jscomp$15_ret$$) ? new URL($filename$jscomp$15_ret$$) : $filename$jscomp$15_ret$$;
    $filename$jscomp$15_ret$$ = fs.readFileSync($filename$jscomp$15_ret$$);
    $assert$$(Buffer.isBuffer($filename$jscomp$15_ret$$));
    return $filename$jscomp$15_ret$$;
  };
  $readAsync$$ = async $filename$jscomp$16_ret$jscomp$1$$ => {
    $filename$jscomp$16_ret$jscomp$1$$ = $isFileURI$$($filename$jscomp$16_ret$jscomp$1$$) ? new URL($filename$jscomp$16_ret$jscomp$1$$) : $filename$jscomp$16_ret$jscomp$1$$;
    $filename$jscomp$16_ret$jscomp$1$$ = fs.readFileSync($filename$jscomp$16_ret$jscomp$1$$, void 0);
    $assert$$(Buffer.isBuffer($filename$jscomp$16_ret$jscomp$1$$));
    return $filename$jscomp$16_ret$jscomp$1$$;
  };
  1 < process.argv.length && ($thisProgram$$ = process.argv[1].replace(/\\/g, "/"));
  $arguments_$$ = process.argv.slice(2);
  "undefined" != typeof module && (module.exports = $Module$$);
  $quit_$$ = ($status$jscomp$1$$, $toThrow$jscomp$1$$) => {
    process.exitCode = $status$jscomp$1$$;
    throw $toThrow$jscomp$1$$;
  };
} else if ($ENVIRONMENT_IS_SHELL$$) {
  if ("object" == typeof process && process.versions?.node && "renderer" != process.type || "object" == typeof window || "undefined" != typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
} else if ($ENVIRONMENT_IS_WEB$$ || $ENVIRONMENT_IS_WORKER$$) {
  try {
    $scriptDirectory$$ = (new URL(".", $_scriptName$$)).href;
  } catch {
  }
  if ("object" != typeof window && "undefined" == typeof WorkerGlobalScope) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  $ENVIRONMENT_IS_WORKER$$ && ($readBinary$$ = $url$jscomp$26$$ => {
    var $xhr$$ = new XMLHttpRequest();
    $xhr$$.open("GET", $url$jscomp$26$$, !1);
    $xhr$$.responseType = "arraybuffer";
    $xhr$$.send(null);
    return new Uint8Array($xhr$$.response);
  });
  $readAsync$$ = async $url$jscomp$27$$ => {
    if ($isFileURI$$($url$jscomp$27$$)) {
      return new Promise(($resolve$$, $reject$$) => {
        var $xhr$jscomp$1$$ = new XMLHttpRequest();
        $xhr$jscomp$1$$.open("GET", $url$jscomp$27$$, !0);
        $xhr$jscomp$1$$.responseType = "arraybuffer";
        $xhr$jscomp$1$$.onload = () => {
          200 == $xhr$jscomp$1$$.status || 0 == $xhr$jscomp$1$$.status && $xhr$jscomp$1$$.response ? $resolve$$($xhr$jscomp$1$$.response) : $reject$$($xhr$jscomp$1$$.status);
        };
        $xhr$jscomp$1$$.onerror = $reject$$;
        $xhr$jscomp$1$$.send(null);
      });
    }
    var $response$jscomp$2$$ = await fetch($url$jscomp$27$$, {credentials:"same-origin"});
    if ($response$jscomp$2$$.ok) {
      return $response$jscomp$2$$.arrayBuffer();
    }
    throw Error($response$jscomp$2$$.status + " : " + $response$jscomp$2$$.url);
  };
} else {
  throw Error("environment detection error");
}
var $out$$ = console.log.bind(console), $err$$ = console.error.bind(console);
$assert$$(!$ENVIRONMENT_IS_SHELL$$, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var $wasmBinary$$;
"object" != typeof WebAssembly && $err$$("no native wasm support detected");
var $ABORT$$ = !1, $EXITSTATUS$$;
function $assert$$($condition$jscomp$2$$, $text$jscomp$12$$) {
  $condition$jscomp$2$$ || $abort$$("Assertion failed" + ($text$jscomp$12$$ ? ": " + $text$jscomp$12$$ : ""));
}
var $isFileURI$$ = $filename$jscomp$17$$ => $filename$jscomp$17$$.startsWith("file://");
function $writeStackCookie$$() {
  var $max$$ = $_emscripten_stack_get_end$$();
  $assert$$(0 == ($max$$ & 3));
  0 == $max$$ && ($max$$ += 4);
  $HEAPU32$$[$max$$ >>> 2 >>> 0] = 34821223;
  $HEAPU32$$[$max$$ + 4 >>> 2 >>> 0] = 2310721022;
  $HEAPU32$$[0] = 1668509029;
}
function $checkStackCookie$$() {
  if (!$ABORT$$) {
    var $max$jscomp$1$$ = $_emscripten_stack_get_end$$();
    0 == $max$jscomp$1$$ && ($max$jscomp$1$$ += 4);
    var $cookie1$$ = $HEAPU32$$[$max$jscomp$1$$ >>> 2 >>> 0], $cookie2$$ = $HEAPU32$$[$max$jscomp$1$$ + 4 >>> 2 >>> 0];
    34821223 == $cookie1$$ && 2310721022 == $cookie2$$ || $abort$$(`Stack overflow! Stack cookie has been overwritten at ${$ptrToString$$($max$jscomp$1$$)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${$ptrToString$$($cookie2$$)} ${$ptrToString$$($cookie1$$)}`);
    1668509029 != $HEAPU32$$[0] && $abort$$("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var $h16$jscomp$inline_51$$ = new Int16Array(1), $h8$jscomp$inline_52$$ = new Int8Array($h16$jscomp$inline_51$$.buffer);
$h16$jscomp$inline_51$$[0] = 25459;
if (115 !== $h8$jscomp$inline_52$$[0] || 99 !== $h8$jscomp$inline_52$$[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
function $consumedModuleProp$$($prop$jscomp$2$$) {
  Object.getOwnPropertyDescriptor($Module$$, $prop$jscomp$2$$) || Object.defineProperty($Module$$, $prop$jscomp$2$$, {configurable:!0, set() {
    $abort$$(`Attempt to set \`Module.${$prop$jscomp$2$$}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
  }});
}
function $makeInvalidEarlyAccess$$($name$jscomp$80$$) {
  return () => $assert$$(!1, `call to '${$name$jscomp$80$$}' via reference taken before Wasm module initialization`);
}
function $isExportedByForceFilesystem$$($name$jscomp$81$$) {
  return "FS_createPath" === $name$jscomp$81$$ || "FS_createDataFile" === $name$jscomp$81$$ || "FS_createPreloadedFile" === $name$jscomp$81$$ || "FS_preloadFile" === $name$jscomp$81$$ || "FS_unlink" === $name$jscomp$81$$ || "addRunDependency" === $name$jscomp$81$$ || "FS_createLazyFile" === $name$jscomp$81$$ || "FS_createDevice" === $name$jscomp$81$$ || "removeRunDependency" === $name$jscomp$81$$;
}
function $hookGlobalSymbolAccess$$($sym$jscomp$2$$, $func$jscomp$7$$) {
  "undefined" == typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, $sym$jscomp$2$$) || Object.defineProperty(globalThis, $sym$jscomp$2$$, {configurable:!0, get() {
    $func$jscomp$7$$();
  }});
}
function $missingGlobal$$($sym$jscomp$3$$, $msg$$) {
  $hookGlobalSymbolAccess$$($sym$jscomp$3$$, () => {
    $warnOnce$$(`\`${$sym$jscomp$3$$}\` is no longer defined by emscripten. ${$msg$$}`);
  });
}
$missingGlobal$$("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
$missingGlobal$$("asm", "Please use wasmExports instead");
function $unexportedRuntimeSymbol$$($sym$jscomp$5$$) {
  Object.getOwnPropertyDescriptor($Module$$, $sym$jscomp$5$$) || Object.defineProperty($Module$$, $sym$jscomp$5$$, {configurable:!0, get() {
    var $msg$jscomp$2$$ = `'${$sym$jscomp$5$$}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
    $isExportedByForceFilesystem$$($sym$jscomp$5$$) && ($msg$jscomp$2$$ += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    $abort$$($msg$jscomp$2$$);
  }});
}
var $wasmMemory$$, $HEAP8$$, $HEAPU8$$, $HEAP16$$, $HEAPU16$$, $HEAP32$$, $HEAPU32$$, $HEAPF32$$, $HEAPF64$$, $HEAP64$$, $runtimeInitialized$$ = !1;
function $updateMemoryViews$$() {
  var $b$jscomp$1$$ = $wasmMemory$$.buffer;
  $HEAP8$$ = new Int8Array($b$jscomp$1$$);
  $HEAP16$$ = new Int16Array($b$jscomp$1$$);
  $HEAPU8$$ = new Uint8Array($b$jscomp$1$$);
  $HEAPU16$$ = new Uint16Array($b$jscomp$1$$);
  $HEAP32$$ = new Int32Array($b$jscomp$1$$);
  $HEAPU32$$ = new Uint32Array($b$jscomp$1$$);
  $HEAPF32$$ = new Float32Array($b$jscomp$1$$);
  $HEAPF64$$ = new Float64Array($b$jscomp$1$$);
  $HEAP64$$ = new BigInt64Array($b$jscomp$1$$);
  new BigUint64Array($b$jscomp$1$$);
}
$assert$$("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
function $abort$$($what$$) {
  $Module$$.onAbort?.($what$$);
  $what$$ = "Aborted(" + $what$$ + ")";
  $err$$($what$$);
  $ABORT$$ = !0;
  0 <= $what$$.indexOf("RuntimeError: unreachable") && ($what$$ += '. "unreachable" may be due to ASYNCIFY_STACK_SIZE not being large enough (try increasing it)');
  throw new WebAssembly.RuntimeError($what$$);
}
function $createExportWrapper$$($name$jscomp$82$$, $nargs$$) {
  return (...$args$jscomp$111$$) => {
    $assert$$($runtimeInitialized$$, `native function \`${$name$jscomp$82$$}\` called before runtime initialization`);
    var $f$jscomp$1$$ = $wasmExports$$[$name$jscomp$82$$];
    $assert$$($f$jscomp$1$$, `exported native function \`${$name$jscomp$82$$}\` not found`);
    $assert$$($args$jscomp$111$$.length <= $nargs$$, `native function \`${$name$jscomp$82$$}\` called with ${$args$jscomp$111$$.length} args but expects ${$nargs$$}`);
    return $f$jscomp$1$$(...$args$jscomp$111$$);
  };
}
var $wasmBinaryFile$$;
async function $getWasmBinary$$($JSCompiler_inline_result$jscomp$1_binaryFile$$) {
  if (!$wasmBinary$$) {
    try {
      var $response$jscomp$3$$ = await $readAsync$$($JSCompiler_inline_result$jscomp$1_binaryFile$$);
      return new Uint8Array($response$jscomp$3$$);
    } catch {
    }
  }
  if ($JSCompiler_inline_result$jscomp$1_binaryFile$$ == $wasmBinaryFile$$ && $wasmBinary$$) {
    $JSCompiler_inline_result$jscomp$1_binaryFile$$ = new Uint8Array($wasmBinary$$);
  } else {
    if ($readBinary$$) {
      $JSCompiler_inline_result$jscomp$1_binaryFile$$ = $readBinary$$($JSCompiler_inline_result$jscomp$1_binaryFile$$);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  return $JSCompiler_inline_result$jscomp$1_binaryFile$$;
}
async function $instantiateArrayBuffer$$($binaryFile$jscomp$1$$, $imports$$) {
  try {
    var $binary$jscomp$1$$ = await $getWasmBinary$$($binaryFile$jscomp$1$$);
    return await WebAssembly.instantiate($binary$jscomp$1$$, $imports$$);
  } catch ($reason$jscomp$9$$) {
    $err$$(`failed to asynchronously prepare wasm: ${$reason$jscomp$9$$}`), $isFileURI$$($wasmBinaryFile$$) && $err$$(`warning: Loading from a file URI (${$wasmBinaryFile$$}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), $abort$$($reason$jscomp$9$$);
  }
}
async function $instantiateAsync$$($imports$jscomp$1$$) {
  var $binaryFile$jscomp$2$$ = $wasmBinaryFile$$;
  if (!$wasmBinary$$ && !$isFileURI$$($binaryFile$jscomp$2$$) && !$ENVIRONMENT_IS_NODE$$) {
    try {
      var $response$jscomp$4$$ = fetch($binaryFile$jscomp$2$$, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming($response$jscomp$4$$, $imports$jscomp$1$$);
    } catch ($reason$jscomp$10$$) {
      $err$$(`wasm streaming compile failed: ${$reason$jscomp$10$$}`), $err$$("falling back to ArrayBuffer instantiation");
    }
  }
  return $instantiateArrayBuffer$$($binaryFile$jscomp$2$$, $imports$jscomp$1$$);
}
class $ExitStatus$$ {
  name="ExitStatus";
  constructor($status$jscomp$2$$) {
    this.message = `Program terminated with exit(${$status$jscomp$2$$})`;
    this.status = $status$jscomp$2$$;
  }
}
var $callRuntimeCallbacks$$ = $callbacks$$ => {
  for (; 0 < $callbacks$$.length;) {
    $callbacks$$.shift()($Module$$);
  }
}, $onPostRuns$$ = [], $onPreRuns$$ = [], $addOnPreRun$$ = () => {
  var $cb$jscomp$7$$ = $Module$$.preRun.shift();
  $onPreRuns$$.push($cb$jscomp$7$$);
}, $runDependencies$$ = 0, $dependenciesFulfilled$$ = null, $runDependencyTracking$$ = {}, $runDependencyWatcher$$ = null, $removeRunDependency$$ = $callback$jscomp$131_id$jscomp$8$$ => {
  $runDependencies$$--;
  $Module$$.monitorRunDependencies?.($runDependencies$$);
  $assert$$($callback$jscomp$131_id$jscomp$8$$, "removeRunDependency requires an ID");
  $assert$$($runDependencyTracking$$[$callback$jscomp$131_id$jscomp$8$$]);
  delete $runDependencyTracking$$[$callback$jscomp$131_id$jscomp$8$$];
  0 == $runDependencies$$ && (null !== $runDependencyWatcher$$ && (clearInterval($runDependencyWatcher$$), $runDependencyWatcher$$ = null), $dependenciesFulfilled$$ && ($callback$jscomp$131_id$jscomp$8$$ = $dependenciesFulfilled$$, $dependenciesFulfilled$$ = null, $callback$jscomp$131_id$jscomp$8$$()));
}, $addRunDependency$$ = $id$jscomp$9$$ => {
  $runDependencies$$++;
  $Module$$.monitorRunDependencies?.($runDependencies$$);
  $assert$$($id$jscomp$9$$, "addRunDependency requires an ID");
  $assert$$(!$runDependencyTracking$$[$id$jscomp$9$$]);
  $runDependencyTracking$$[$id$jscomp$9$$] = 1;
  null === $runDependencyWatcher$$ && "undefined" != typeof setInterval && ($runDependencyWatcher$$ = setInterval(() => {
    if ($ABORT$$) {
      clearInterval($runDependencyWatcher$$), $runDependencyWatcher$$ = null;
    } else {
      var $shown$$ = !1, $dep$$;
      for ($dep$$ in $runDependencyTracking$$) {
        $shown$$ || ($shown$$ = !0, $err$$("still waiting on run dependencies:")), $err$$(`dependency: ${$dep$$}`);
      }
      $shown$$ && $err$$("(end of list)");
    }
  }, 1e4), $runDependencyWatcher$$.unref?.());
}, $dynCalls$$ = {}, $dynCall$$ = ($sig$jscomp$1$$, $ptr$jscomp$1_rtn$jscomp$inline_56$$, $args$jscomp$113$$ = []) => {
  $assert$$(!0, "async dynCall is not supported in this mode");
  var $sig$jscomp$inline_438$$ = $sig$jscomp$1$$.replace(/p/g, "i");
  $assert$$($sig$jscomp$inline_438$$ in $dynCalls$$, `bad function pointer type - sig is not in dynCalls: '${$sig$jscomp$inline_438$$}'`);
  $args$jscomp$113$$?.length ? $assert$$($args$jscomp$113$$.length === $sig$jscomp$inline_438$$.length - 1) : $assert$$(1 == $sig$jscomp$inline_438$$.length);
  $ptr$jscomp$1_rtn$jscomp$inline_56$$ = (0,$dynCalls$$[$sig$jscomp$inline_438$$])($ptr$jscomp$1_rtn$jscomp$inline_56$$, ...$args$jscomp$113$$);
  return "p" == $sig$jscomp$1$$[0] ? $ptr$jscomp$1_rtn$jscomp$inline_56$$ >>> 0 : $ptr$jscomp$1_rtn$jscomp$inline_56$$;
}, $noExitRuntime$$ = !0, $ptrToString$$ = $ptr$jscomp$3$$ => {
  $assert$$("number" === typeof $ptr$jscomp$3$$);
  return "0x" + ($ptr$jscomp$3$$ >>> 0).toString(16).padStart(8, "0");
};
function $setValue$$($ptr$jscomp$4$$, $value$jscomp$110$$) {
  var $type$jscomp$171$$ = "float";
  $type$jscomp$171$$.endsWith("*") && ($type$jscomp$171$$ = "*");
  switch($type$jscomp$171$$) {
    case "i1":
      $HEAP8$$[$ptr$jscomp$4$$ >>> 0] = $value$jscomp$110$$;
      break;
    case "i8":
      $HEAP8$$[$ptr$jscomp$4$$ >>> 0] = $value$jscomp$110$$;
      break;
    case "i16":
      $HEAP16$$[$ptr$jscomp$4$$ >>> 1 >>> 0] = $value$jscomp$110$$;
      break;
    case "i32":
      $HEAP32$$[$ptr$jscomp$4$$ >>> 2 >>> 0] = $value$jscomp$110$$;
      break;
    case "i64":
      $HEAP64$$[$ptr$jscomp$4$$ >>> 3 >>> 0] = BigInt($value$jscomp$110$$);
      break;
    case "float":
      $HEAPF32$$[$ptr$jscomp$4$$ >>> 2 >>> 0] = $value$jscomp$110$$;
      break;
    case "double":
      $HEAPF64$$[$ptr$jscomp$4$$ >>> 3 >>> 0] = $value$jscomp$110$$;
      break;
    case "*":
      $HEAPU32$$[$ptr$jscomp$4$$ >>> 2 >>> 0] = $value$jscomp$110$$;
      break;
    default:
      $abort$$(`invalid type for setValue: ${$type$jscomp$171$$}`);
  }
}
var $warnOnce$$ = $text$jscomp$13$$ => {
  $warnOnce$$.$shown$ || ($warnOnce$$.$shown$ = {});
  $warnOnce$$.$shown$[$text$jscomp$13$$] || ($warnOnce$$.$shown$[$text$jscomp$13$$] = 1, $ENVIRONMENT_IS_NODE$$ && ($text$jscomp$13$$ = "warning: " + $text$jscomp$13$$), $err$$($text$jscomp$13$$));
}, $bigintToI53Checked$$ = $num$jscomp$6$$ => -9007199254740992 > $num$jscomp$6$$ || 9007199254740992 < $num$jscomp$6$$ ? NaN : Number($num$jscomp$6$$), $UTF8Decoder$$ = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0, $UTF8ArrayToString$$ = ($heapOrArray$jscomp$1$$, $idx$jscomp$1$$ = 0, $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$) => {
  $idx$jscomp$1$$ >>>= 0;
  var $endPtr_idx$jscomp$inline_59$$ = $idx$jscomp$1$$;
  for ($maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$ = $endPtr_idx$jscomp$inline_59$$ + $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$; $heapOrArray$jscomp$1$$[$endPtr_idx$jscomp$inline_59$$] && !($endPtr_idx$jscomp$inline_59$$ >= $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$);) {
    ++$endPtr_idx$jscomp$inline_59$$;
  }
  if (16 < $endPtr_idx$jscomp$inline_59$$ - $idx$jscomp$1$$ && $heapOrArray$jscomp$1$$.buffer && $UTF8Decoder$$) {
    return $UTF8Decoder$$.decode($heapOrArray$jscomp$1$$.subarray($idx$jscomp$1$$, $endPtr_idx$jscomp$inline_59$$));
  }
  for ($maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$ = ""; $idx$jscomp$1$$ < $endPtr_idx$jscomp$inline_59$$;) {
    var $ch_u0$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++];
    if ($ch_u0$$ & 128) {
      var $u1$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63;
      if (192 == ($ch_u0$$ & 224)) {
        $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$ += String.fromCharCode(($ch_u0$$ & 31) << 6 | $u1$$);
      } else {
        var $u2$$ = $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63;
        224 == ($ch_u0$$ & 240) ? $ch_u0$$ = ($ch_u0$$ & 15) << 12 | $u1$$ << 6 | $u2$$ : (240 != ($ch_u0$$ & 248) && $warnOnce$$("Invalid UTF-8 leading byte " + $ptrToString$$($ch_u0$$) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), $ch_u0$$ = ($ch_u0$$ & 7) << 18 | $u1$$ << 12 | $u2$$ << 6 | $heapOrArray$jscomp$1$$[$idx$jscomp$1$$++] & 63);
        65536 > $ch_u0$$ ? $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$ += String.fromCharCode($ch_u0$$) : ($ch_u0$$ -= 65536, $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$ += String.fromCharCode(55296 | $ch_u0$$ >> 10, 56320 | $ch_u0$$ & 1023));
      }
    } else {
      $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$ += String.fromCharCode($ch_u0$$);
    }
  }
  return $maxBytesToRead$jscomp$1_maxIdx$jscomp$inline_62_str$jscomp$9$$;
}, $UTF8ToString$$ = ($ptr$jscomp$5$$, $maxBytesToRead$jscomp$2$$) => {
  $assert$$("number" == typeof $ptr$jscomp$5$$, `UTF8ToString expects a number (got ${typeof $ptr$jscomp$5$$})`);
  return ($ptr$jscomp$5$$ >>>= 0) ? $UTF8ArrayToString$$($HEAPU8$$, $ptr$jscomp$5$$, $maxBytesToRead$jscomp$2$$) : "";
};
class $ExceptionInfo$$ {
  constructor($excPtr$$) {
    this.$ptr$ = $excPtr$$ - 24;
  }
}
var $uncaughtExceptionCount$$ = 0, $syscallGetVarargI$$ = () => {
  $assert$$(void 0 != $SYSCALLS$varargs$$);
  var $ret$jscomp$2$$ = $HEAP32$$[+$SYSCALLS$varargs$$ >>> 2 >>> 0];
  $SYSCALLS$varargs$$ += 4;
  return $ret$jscomp$2$$;
}, $PATH$normalizeArray$$ = ($parts$$, $allowAboveRoot$$) => {
  for (var $up$$ = 0, $i$jscomp$4$$ = $parts$$.length - 1; 0 <= $i$jscomp$4$$; $i$jscomp$4$$--) {
    var $last$$ = $parts$$[$i$jscomp$4$$];
    "." === $last$$ ? $parts$$.splice($i$jscomp$4$$, 1) : ".." === $last$$ ? ($parts$$.splice($i$jscomp$4$$, 1), $up$$++) : $up$$ && ($parts$$.splice($i$jscomp$4$$, 1), $up$$--);
  }
  if ($allowAboveRoot$$) {
    for (; $up$$; $up$$--) {
      $parts$$.unshift("..");
    }
  }
  return $parts$$;
}, $PATH$normalize$$ = $path$jscomp$41$$ => {
  var $isAbsolute$$ = "/" === $path$jscomp$41$$.charAt(0), $trailingSlash$$ = "/" === $path$jscomp$41$$.slice(-1);
  ($path$jscomp$41$$ = $PATH$normalizeArray$$($path$jscomp$41$$.split("/").filter($p$jscomp$4$$ => !!$p$jscomp$4$$), !$isAbsolute$$).join("/")) || $isAbsolute$$ || ($path$jscomp$41$$ = ".");
  $path$jscomp$41$$ && $trailingSlash$$ && ($path$jscomp$41$$ += "/");
  return ($isAbsolute$$ ? "/" : "") + $path$jscomp$41$$;
}, $PATH$dirname$$ = $path$jscomp$42_root$jscomp$3$$ => {
  var $dir_result$jscomp$3$$ = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec($path$jscomp$42_root$jscomp$3$$).slice(1);
  $path$jscomp$42_root$jscomp$3$$ = $dir_result$jscomp$3$$[0];
  $dir_result$jscomp$3$$ = $dir_result$jscomp$3$$[1];
  if (!$path$jscomp$42_root$jscomp$3$$ && !$dir_result$jscomp$3$$) {
    return ".";
  }
  $dir_result$jscomp$3$$ &&= $dir_result$jscomp$3$$.slice(0, -1);
  return $path$jscomp$42_root$jscomp$3$$ + $dir_result$jscomp$3$$;
}, $PATH$basename$$ = $path$jscomp$43$$ => $path$jscomp$43$$ && $path$jscomp$43$$.match(/([^\/]+|\/)\/*$/)[1], $initRandomFill$$ = () => {
  if ($ENVIRONMENT_IS_NODE$$) {
    var $nodeCrypto$$ = require("crypto");
    return $view$jscomp$5$$ => $nodeCrypto$$.randomFillSync($view$jscomp$5$$);
  }
  return $view$jscomp$6$$ => crypto.getRandomValues($view$jscomp$6$$);
}, $randomFill$$ = $view$jscomp$7$$ => {
  ($randomFill$$ = $initRandomFill$$())($view$jscomp$7$$);
}, $PATH_FS$resolve$$ = (...$args$jscomp$114$$) => {
  for (var $resolvedPath$$ = "", $path$jscomp$44_resolvedAbsolute$$ = !1, $i$jscomp$5$$ = $args$jscomp$114$$.length - 1; -1 <= $i$jscomp$5$$ && !$path$jscomp$44_resolvedAbsolute$$; $i$jscomp$5$$--) {
    $path$jscomp$44_resolvedAbsolute$$ = 0 <= $i$jscomp$5$$ ? $args$jscomp$114$$[$i$jscomp$5$$] : "/";
    if ("string" != typeof $path$jscomp$44_resolvedAbsolute$$) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!$path$jscomp$44_resolvedAbsolute$$) {
      return "";
    }
    $resolvedPath$$ = $path$jscomp$44_resolvedAbsolute$$ + "/" + $resolvedPath$$;
    $path$jscomp$44_resolvedAbsolute$$ = "/" === $path$jscomp$44_resolvedAbsolute$$.charAt(0);
  }
  $resolvedPath$$ = $PATH$normalizeArray$$($resolvedPath$$.split("/").filter($p$jscomp$5$$ => !!$p$jscomp$5$$), !$path$jscomp$44_resolvedAbsolute$$).join("/");
  return ($path$jscomp$44_resolvedAbsolute$$ ? "/" : "") + $resolvedPath$$ || ".";
}, $FS_stdin_getChar_buffer$$ = [], $lengthBytesUTF8$$ = $str$jscomp$10$$ => {
  for (var $len$jscomp$3$$ = 0, $i$jscomp$7$$ = 0; $i$jscomp$7$$ < $str$jscomp$10$$.length; ++$i$jscomp$7$$) {
    var $c$$ = $str$jscomp$10$$.charCodeAt($i$jscomp$7$$);
    127 >= $c$$ ? $len$jscomp$3$$++ : 2047 >= $c$$ ? $len$jscomp$3$$ += 2 : 55296 <= $c$$ && 57343 >= $c$$ ? ($len$jscomp$3$$ += 4, ++$i$jscomp$7$$) : $len$jscomp$3$$ += 3;
  }
  return $len$jscomp$3$$;
}, $stringToUTF8Array$$ = ($str$jscomp$11$$, $heap$$, $outIdx$$, $endIdx_maxBytesToWrite$$) => {
  $outIdx$$ >>>= 0;
  $assert$$("string" === typeof $str$jscomp$11$$, `stringToUTF8Array expects a string (got ${typeof $str$jscomp$11$$})`);
  if (!(0 < $endIdx_maxBytesToWrite$$)) {
    return 0;
  }
  var $startIdx$$ = $outIdx$$;
  $endIdx_maxBytesToWrite$$ = $outIdx$$ + $endIdx_maxBytesToWrite$$ - 1;
  for (var $i$jscomp$8$$ = 0; $i$jscomp$8$$ < $str$jscomp$11$$.length; ++$i$jscomp$8$$) {
    var $u$$ = $str$jscomp$11$$.codePointAt($i$jscomp$8$$);
    if (127 >= $u$$) {
      if ($outIdx$$ >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++ >>> 0] = $u$$;
    } else if (2047 >= $u$$) {
      if ($outIdx$$ + 1 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++ >>> 0] = 192 | $u$$ >> 6;
      $heap$$[$outIdx$$++ >>> 0] = 128 | $u$$ & 63;
    } else if (65535 >= $u$$) {
      if ($outIdx$$ + 2 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      $heap$$[$outIdx$$++ >>> 0] = 224 | $u$$ >> 12;
      $heap$$[$outIdx$$++ >>> 0] = 128 | $u$$ >> 6 & 63;
      $heap$$[$outIdx$$++ >>> 0] = 128 | $u$$ & 63;
    } else {
      if ($outIdx$$ + 3 >= $endIdx_maxBytesToWrite$$) {
        break;
      }
      1114111 < $u$$ && $warnOnce$$("Invalid Unicode code point " + $ptrToString$$($u$$) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
      $heap$$[$outIdx$$++ >>> 0] = 240 | $u$$ >> 18;
      $heap$$[$outIdx$$++ >>> 0] = 128 | $u$$ >> 12 & 63;
      $heap$$[$outIdx$$++ >>> 0] = 128 | $u$$ >> 6 & 63;
      $heap$$[$outIdx$$++ >>> 0] = 128 | $u$$ & 63;
      $i$jscomp$8$$++;
    }
  }
  $heap$$[$outIdx$$ >>> 0] = 0;
  return $outIdx$$ - $startIdx$$;
}, $intArrayFromString$$ = $numBytesWritten_stringy$$ => {
  var $u8array$$ = Array($lengthBytesUTF8$$($numBytesWritten_stringy$$) + 1);
  $numBytesWritten_stringy$$ = $stringToUTF8Array$$($numBytesWritten_stringy$$, $u8array$$, 0, $u8array$$.length);
  $u8array$$.length = $numBytesWritten_stringy$$;
  return $u8array$$;
}, $TTY$ttys$$ = [];
function $TTY$register$$($dev$$, $ops$$) {
  $TTY$ttys$$[$dev$$] = {input:[], output:[], $ops$:$ops$$};
  $FS$registerDevice$$($dev$$, $TTY$stream_ops$$);
}
var $TTY$stream_ops$$ = {open($stream$jscomp$6$$) {
  var $tty$jscomp$1$$ = $TTY$ttys$$[$stream$jscomp$6$$.node.rdev];
  if (!$tty$jscomp$1$$) {
    throw new $FS$ErrnoError$$(43);
  }
  $stream$jscomp$6$$.tty = $tty$jscomp$1$$;
  $stream$jscomp$6$$.seekable = !1;
}, close($stream$jscomp$7$$) {
  $stream$jscomp$7$$.tty.$ops$.fsync($stream$jscomp$7$$.tty);
}, fsync($stream$jscomp$8$$) {
  $stream$jscomp$8$$.tty.$ops$.fsync($stream$jscomp$8$$.tty);
}, read($stream$jscomp$9$$, $buffer$jscomp$27$$, $offset$jscomp$67$$, $length$jscomp$27$$) {
  if (!$stream$jscomp$9$$.tty || !$stream$jscomp$9$$.tty.$ops$.$get_char$) {
    throw new $FS$ErrnoError$$(60);
  }
  for (var $bytesRead$jscomp$1$$ = 0, $i$jscomp$9$$ = 0; $i$jscomp$9$$ < $length$jscomp$27$$; $i$jscomp$9$$++) {
    try {
      var $result$jscomp$5$$ = $stream$jscomp$9$$.tty.$ops$.$get_char$($stream$jscomp$9$$.tty);
    } catch ($e$jscomp$10$$) {
      throw new $FS$ErrnoError$$(29);
    }
    if (void 0 === $result$jscomp$5$$ && 0 === $bytesRead$jscomp$1$$) {
      throw new $FS$ErrnoError$$(6);
    }
    if (null === $result$jscomp$5$$ || void 0 === $result$jscomp$5$$) {
      break;
    }
    $bytesRead$jscomp$1$$++;
    $buffer$jscomp$27$$[$offset$jscomp$67$$ + $i$jscomp$9$$] = $result$jscomp$5$$;
  }
  $bytesRead$jscomp$1$$ && ($stream$jscomp$9$$.node.atime = Date.now());
  return $bytesRead$jscomp$1$$;
}, write($stream$jscomp$10$$, $buffer$jscomp$28$$, $offset$jscomp$68$$, $length$jscomp$28$$) {
  if (!$stream$jscomp$10$$.tty || !$stream$jscomp$10$$.tty.$ops$.$put_char$) {
    throw new $FS$ErrnoError$$(60);
  }
  try {
    for (var $i$jscomp$10$$ = 0; $i$jscomp$10$$ < $length$jscomp$28$$; $i$jscomp$10$$++) {
      $stream$jscomp$10$$.tty.$ops$.$put_char$($stream$jscomp$10$$.tty, $buffer$jscomp$28$$[$offset$jscomp$68$$ + $i$jscomp$10$$]);
    }
  } catch ($e$jscomp$11$$) {
    throw new $FS$ErrnoError$$(29);
  }
  $length$jscomp$28$$ && ($stream$jscomp$10$$.node.mtime = $stream$jscomp$10$$.node.ctime = Date.now());
  return $i$jscomp$10$$;
}}, $TTY$default_tty_ops$$ = {$get_char$() {
  a: {
    if (!$FS_stdin_getChar_buffer$$.length) {
      var $JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ = null;
      if ($ENVIRONMENT_IS_NODE$$) {
        var $buf$jscomp$inline_65$$ = Buffer.alloc(256), $bytesRead$jscomp$inline_66$$ = 0, $fd$jscomp$inline_67$$ = process.stdin.fd;
        try {
          $bytesRead$jscomp$inline_66$$ = fs.readSync($fd$jscomp$inline_67$$, $buf$jscomp$inline_65$$, 0, 256);
        } catch ($e$jscomp$inline_68$$) {
          if ($e$jscomp$inline_68$$.toString().includes("EOF")) {
            $bytesRead$jscomp$inline_66$$ = 0;
          } else {
            throw $e$jscomp$inline_68$$;
          }
        }
        0 < $bytesRead$jscomp$inline_66$$ && ($JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ = $buf$jscomp$inline_65$$.slice(0, $bytesRead$jscomp$inline_66$$).toString("utf-8"));
      } else {
        "undefined" != typeof window && "function" == typeof window.prompt && ($JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ = window.prompt("Input: "), null !== $JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ && ($JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ += "\n"));
      }
      if (!$JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$) {
        $JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ = null;
        break a;
      }
      $FS_stdin_getChar_buffer$$ = $intArrayFromString$$($JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$);
    }
    $JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$ = $FS_stdin_getChar_buffer$$.shift();
  }
  return $JSCompiler_inline_result$jscomp$3_result$jscomp$inline_64$$;
}, $put_char$($tty$jscomp$3$$, $val$jscomp$1$$) {
  null === $val$jscomp$1$$ || 10 === $val$jscomp$1$$ ? ($out$$($UTF8ArrayToString$$($tty$jscomp$3$$.output)), $tty$jscomp$3$$.output = []) : 0 != $val$jscomp$1$$ && $tty$jscomp$3$$.output.push($val$jscomp$1$$);
}, fsync($tty$jscomp$4$$) {
  0 < $tty$jscomp$4$$.output?.length && ($out$$($UTF8ArrayToString$$($tty$jscomp$4$$.output)), $tty$jscomp$4$$.output = []);
}, $ioctl_tcgets$() {
  return {$c_iflag$:25856, $c_oflag$:5, $c_cflag$:191, $c_lflag$:35387, $c_cc$:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, $ioctl_tcsets$() {
  return 0;
}, $ioctl_tiocgwinsz$() {
  return [24, 80];
}}, $TTY$default_tty1_ops$$ = {$put_char$($tty$jscomp$8$$, $val$jscomp$2$$) {
  null === $val$jscomp$2$$ || 10 === $val$jscomp$2$$ ? ($err$$($UTF8ArrayToString$$($tty$jscomp$8$$.output)), $tty$jscomp$8$$.output = []) : 0 != $val$jscomp$2$$ && $tty$jscomp$8$$.output.push($val$jscomp$2$$);
}, fsync($tty$jscomp$9$$) {
  0 < $tty$jscomp$9$$.output?.length && ($err$$($UTF8ArrayToString$$($tty$jscomp$9$$.output)), $tty$jscomp$9$$.output = []);
}}, $mmapAlloc$$ = () => {
  $abort$$("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
}, $MEMFS$$ = {$ops_table$:null, $mount$() {
  return $MEMFS$$.createNode(null, "/", 16895, 0);
}, createNode($parent$jscomp$4$$, $name$jscomp$83$$, $mode$jscomp$27_node$jscomp$5$$, $dev$jscomp$1$$) {
  if (24576 === ($mode$jscomp$27_node$jscomp$5$$ & 61440) || 4096 === ($mode$jscomp$27_node$jscomp$5$$ & 61440)) {
    throw new $FS$ErrnoError$$(63);
  }
  $MEMFS$$.$ops_table$ || ($MEMFS$$.$ops_table$ = {dir:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$, lookup:$MEMFS$$.$node_ops$.lookup, $mknod$:$MEMFS$$.$node_ops$.$mknod$, rename:$MEMFS$$.$node_ops$.rename, unlink:$MEMFS$$.$node_ops$.unlink, rmdir:$MEMFS$$.$node_ops$.rmdir, readdir:$MEMFS$$.$node_ops$.readdir, symlink:$MEMFS$$.$node_ops$.symlink}, stream:{$llseek$:$MEMFS$$.$stream_ops$.$llseek$}}, file:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$}, 
  stream:{$llseek$:$MEMFS$$.$stream_ops$.$llseek$, read:$MEMFS$$.$stream_ops$.read, write:$MEMFS$$.$stream_ops$.write, $mmap$:$MEMFS$$.$stream_ops$.$mmap$, $msync$:$MEMFS$$.$stream_ops$.$msync$}}, link:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$, readlink:$MEMFS$$.$node_ops$.readlink}, stream:{}}, $chrdev$:{node:{$getattr$:$MEMFS$$.$node_ops$.$getattr$, $setattr$:$MEMFS$$.$node_ops$.$setattr$}, stream:$FS$chrdev_stream_ops$$}});
  $mode$jscomp$27_node$jscomp$5$$ = $FS$createNode$$($parent$jscomp$4$$, $name$jscomp$83$$, $mode$jscomp$27_node$jscomp$5$$, $dev$jscomp$1$$);
  $FS$isDir$$($mode$jscomp$27_node$jscomp$5$$.mode) ? ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.dir.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.dir.stream, $mode$jscomp$27_node$jscomp$5$$.$contents$ = {}) : 32768 === ($mode$jscomp$27_node$jscomp$5$$.mode & 61440) ? ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.file.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.file.stream, $mode$jscomp$27_node$jscomp$5$$.$usedBytes$ = 
  0, $mode$jscomp$27_node$jscomp$5$$.$contents$ = null) : 40960 === ($mode$jscomp$27_node$jscomp$5$$.mode & 61440) ? ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.link.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.link.stream) : 8192 === ($mode$jscomp$27_node$jscomp$5$$.mode & 61440) && ($mode$jscomp$27_node$jscomp$5$$.$node_ops$ = $MEMFS$$.$ops_table$.$chrdev$.node, $mode$jscomp$27_node$jscomp$5$$.$stream_ops$ = $MEMFS$$.$ops_table$.$chrdev$.stream);
  $mode$jscomp$27_node$jscomp$5$$.atime = $mode$jscomp$27_node$jscomp$5$$.mtime = $mode$jscomp$27_node$jscomp$5$$.ctime = Date.now();
  $parent$jscomp$4$$ && ($parent$jscomp$4$$.$contents$[$name$jscomp$83$$] = $mode$jscomp$27_node$jscomp$5$$, $parent$jscomp$4$$.atime = $parent$jscomp$4$$.mtime = $parent$jscomp$4$$.ctime = $mode$jscomp$27_node$jscomp$5$$.atime);
  return $mode$jscomp$27_node$jscomp$5$$;
}, $getFileDataAsTypedArray$($node$jscomp$6$$) {
  return $node$jscomp$6$$.$contents$ ? $node$jscomp$6$$.$contents$.subarray ? $node$jscomp$6$$.$contents$.subarray(0, $node$jscomp$6$$.$usedBytes$) : new Uint8Array($node$jscomp$6$$.$contents$) : new Uint8Array(0);
}, $node_ops$:{$getattr$($node$jscomp$9$$) {
  var $attr$$ = {};
  $attr$$.dev = 8192 === ($node$jscomp$9$$.mode & 61440) ? $node$jscomp$9$$.id : 1;
  $attr$$.ino = $node$jscomp$9$$.id;
  $attr$$.mode = $node$jscomp$9$$.mode;
  $attr$$.nlink = 1;
  $attr$$.uid = 0;
  $attr$$.gid = 0;
  $attr$$.rdev = $node$jscomp$9$$.rdev;
  $FS$isDir$$($node$jscomp$9$$.mode) ? $attr$$.size = 4096 : 32768 === ($node$jscomp$9$$.mode & 61440) ? $attr$$.size = $node$jscomp$9$$.$usedBytes$ : 40960 === ($node$jscomp$9$$.mode & 61440) ? $attr$$.size = $node$jscomp$9$$.link.length : $attr$$.size = 0;
  $attr$$.atime = new Date($node$jscomp$9$$.atime);
  $attr$$.mtime = new Date($node$jscomp$9$$.mtime);
  $attr$$.ctime = new Date($node$jscomp$9$$.ctime);
  $attr$$.blksize = 4096;
  $attr$$.blocks = Math.ceil($attr$$.size / $attr$$.blksize);
  return $attr$$;
}, $setattr$($node$jscomp$10$$, $attr$jscomp$1_newSize$jscomp$inline_71$$) {
  for (var $key$jscomp$40_oldContents$jscomp$inline_73$$ of ["mode", "atime", "mtime", "ctime"]) {
    null != $attr$jscomp$1_newSize$jscomp$inline_71$$[$key$jscomp$40_oldContents$jscomp$inline_73$$] && ($node$jscomp$10$$[$key$jscomp$40_oldContents$jscomp$inline_73$$] = $attr$jscomp$1_newSize$jscomp$inline_71$$[$key$jscomp$40_oldContents$jscomp$inline_73$$]);
  }
  void 0 !== $attr$jscomp$1_newSize$jscomp$inline_71$$.size && ($attr$jscomp$1_newSize$jscomp$inline_71$$ = $attr$jscomp$1_newSize$jscomp$inline_71$$.size, $node$jscomp$10$$.$usedBytes$ != $attr$jscomp$1_newSize$jscomp$inline_71$$ && (0 == $attr$jscomp$1_newSize$jscomp$inline_71$$ ? ($node$jscomp$10$$.$contents$ = null, $node$jscomp$10$$.$usedBytes$ = 0) : ($key$jscomp$40_oldContents$jscomp$inline_73$$ = $node$jscomp$10$$.$contents$, $node$jscomp$10$$.$contents$ = new Uint8Array($attr$jscomp$1_newSize$jscomp$inline_71$$), 
  $key$jscomp$40_oldContents$jscomp$inline_73$$ && $node$jscomp$10$$.$contents$.set($key$jscomp$40_oldContents$jscomp$inline_73$$.subarray(0, Math.min($attr$jscomp$1_newSize$jscomp$inline_71$$, $node$jscomp$10$$.$usedBytes$))), $node$jscomp$10$$.$usedBytes$ = $attr$jscomp$1_newSize$jscomp$inline_71$$)));
}, lookup() {
  throw new $FS$ErrnoError$$(44);
}, $mknod$($parent$jscomp$6$$, $name$jscomp$85$$, $mode$jscomp$28$$, $dev$jscomp$2$$) {
  return $MEMFS$$.createNode($parent$jscomp$6$$, $name$jscomp$85$$, $mode$jscomp$28$$, $dev$jscomp$2$$);
}, rename($old_node$$, $new_dir$$, $new_name$$) {
  try {
    var $new_node$$ = $FS$lookupNode$$($new_dir$$, $new_name$$);
  } catch ($e$jscomp$12$$) {
  }
  if ($new_node$$) {
    if ($FS$isDir$$($old_node$$.mode)) {
      for (var $i$jscomp$11$$ in $new_node$$.$contents$) {
        throw new $FS$ErrnoError$$(55);
      }
    }
    $FS$hashRemoveNode$$($new_node$$);
  }
  delete $old_node$$.parent.$contents$[$old_node$$.name];
  $new_dir$$.$contents$[$new_name$$] = $old_node$$;
  $old_node$$.name = $new_name$$;
  $new_dir$$.ctime = $new_dir$$.mtime = $old_node$$.parent.ctime = $old_node$$.parent.mtime = Date.now();
}, unlink($parent$jscomp$7$$, $name$jscomp$86$$) {
  delete $parent$jscomp$7$$.$contents$[$name$jscomp$86$$];
  $parent$jscomp$7$$.ctime = $parent$jscomp$7$$.mtime = Date.now();
}, rmdir($parent$jscomp$8$$, $name$jscomp$87$$) {
  var $node$jscomp$11$$ = $FS$lookupNode$$($parent$jscomp$8$$, $name$jscomp$87$$), $i$jscomp$12$$;
  for ($i$jscomp$12$$ in $node$jscomp$11$$.$contents$) {
    throw new $FS$ErrnoError$$(55);
  }
  delete $parent$jscomp$8$$.$contents$[$name$jscomp$87$$];
  $parent$jscomp$8$$.ctime = $parent$jscomp$8$$.mtime = Date.now();
}, readdir($node$jscomp$12$$) {
  return [".", "..", ...Object.keys($node$jscomp$12$$.$contents$)];
}, symlink($node$jscomp$13_parent$jscomp$9$$, $newname$$, $oldpath$$) {
  $node$jscomp$13_parent$jscomp$9$$ = $MEMFS$$.createNode($node$jscomp$13_parent$jscomp$9$$, $newname$$, 41471, 0);
  $node$jscomp$13_parent$jscomp$9$$.link = $oldpath$$;
  return $node$jscomp$13_parent$jscomp$9$$;
}, readlink($node$jscomp$14$$) {
  if (40960 !== ($node$jscomp$14$$.mode & 61440)) {
    throw new $FS$ErrnoError$$(28);
  }
  return $node$jscomp$14$$.link;
}}, $stream_ops$:{read($size$jscomp$24_stream$jscomp$11$$, $buffer$jscomp$29$$, $offset$jscomp$69$$, $i$jscomp$13_length$jscomp$29$$, $position$jscomp$5$$) {
  var $contents$jscomp$2$$ = $size$jscomp$24_stream$jscomp$11$$.node.$contents$;
  if ($position$jscomp$5$$ >= $size$jscomp$24_stream$jscomp$11$$.node.$usedBytes$) {
    return 0;
  }
  $size$jscomp$24_stream$jscomp$11$$ = Math.min($size$jscomp$24_stream$jscomp$11$$.node.$usedBytes$ - $position$jscomp$5$$, $i$jscomp$13_length$jscomp$29$$);
  $assert$$(0 <= $size$jscomp$24_stream$jscomp$11$$);
  if (8 < $size$jscomp$24_stream$jscomp$11$$ && $contents$jscomp$2$$.subarray) {
    $buffer$jscomp$29$$.set($contents$jscomp$2$$.subarray($position$jscomp$5$$, $position$jscomp$5$$ + $size$jscomp$24_stream$jscomp$11$$), $offset$jscomp$69$$);
  } else {
    for ($i$jscomp$13_length$jscomp$29$$ = 0; $i$jscomp$13_length$jscomp$29$$ < $size$jscomp$24_stream$jscomp$11$$; $i$jscomp$13_length$jscomp$29$$++) {
      $buffer$jscomp$29$$[$offset$jscomp$69$$ + $i$jscomp$13_length$jscomp$29$$] = $contents$jscomp$2$$[$position$jscomp$5$$ + $i$jscomp$13_length$jscomp$29$$];
    }
  }
  return $size$jscomp$24_stream$jscomp$11$$;
}, write($node$jscomp$15_stream$jscomp$12$$, $buffer$jscomp$30$$, $offset$jscomp$70$$, $length$jscomp$30$$, $position$jscomp$6$$, $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$) {
  $assert$$(!($buffer$jscomp$30$$ instanceof ArrayBuffer));
  $buffer$jscomp$30$$.buffer === $HEAP8$$.buffer && ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ = !1);
  if (!$length$jscomp$30$$) {
    return 0;
  }
  $node$jscomp$15_stream$jscomp$12$$ = $node$jscomp$15_stream$jscomp$12$$.node;
  $node$jscomp$15_stream$jscomp$12$$.mtime = $node$jscomp$15_stream$jscomp$12$$.ctime = Date.now();
  if ($buffer$jscomp$30$$.subarray && (!$node$jscomp$15_stream$jscomp$12$$.$contents$ || $node$jscomp$15_stream$jscomp$12$$.$contents$.subarray)) {
    if ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$) {
      return $assert$$(0 === $position$jscomp$6$$, "canOwn must imply no weird position inside the file"), $node$jscomp$15_stream$jscomp$12$$.$contents$ = $buffer$jscomp$30$$.subarray($offset$jscomp$70$$, $offset$jscomp$70$$ + $length$jscomp$30$$), $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ = $length$jscomp$30$$;
    }
    if (0 === $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ && 0 === $position$jscomp$6$$) {
      return $node$jscomp$15_stream$jscomp$12$$.$contents$ = $buffer$jscomp$30$$.slice($offset$jscomp$70$$, $offset$jscomp$70$$ + $length$jscomp$30$$), $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ = $length$jscomp$30$$;
    }
    if ($position$jscomp$6$$ + $length$jscomp$30$$ <= $node$jscomp$15_stream$jscomp$12$$.$usedBytes$) {
      return $node$jscomp$15_stream$jscomp$12$$.$contents$.set($buffer$jscomp$30$$.subarray($offset$jscomp$70$$, $offset$jscomp$70$$ + $length$jscomp$30$$), $position$jscomp$6$$), $length$jscomp$30$$;
    }
  }
  $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ = $position$jscomp$6$$ + $length$jscomp$30$$;
  var $oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$ = $node$jscomp$15_stream$jscomp$12$$.$contents$ ? $node$jscomp$15_stream$jscomp$12$$.$contents$.length : 0;
  $oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$ >= $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ || ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ = Math.max($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$, $oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$ * (1048576 > $oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$ ? 2 : 1.125) >>> 0), 0 != $oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$ && ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ = 
  Math.max($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$, 256)), $oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$ = $node$jscomp$15_stream$jscomp$12$$.$contents$, $node$jscomp$15_stream$jscomp$12$$.$contents$ = new Uint8Array($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$), 0 < $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ && $node$jscomp$15_stream$jscomp$12$$.$contents$.set($oldContents$jscomp$inline_79_prevCapacity$jscomp$inline_78$$.subarray(0, $node$jscomp$15_stream$jscomp$12$$.$usedBytes$), 
  0));
  if ($node$jscomp$15_stream$jscomp$12$$.$contents$.subarray && $buffer$jscomp$30$$.subarray) {
    $node$jscomp$15_stream$jscomp$12$$.$contents$.set($buffer$jscomp$30$$.subarray($offset$jscomp$70$$, $offset$jscomp$70$$ + $length$jscomp$30$$), $position$jscomp$6$$);
  } else {
    for ($canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ = 0; $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$ < $length$jscomp$30$$; $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$++) {
      $node$jscomp$15_stream$jscomp$12$$.$contents$[$position$jscomp$6$$ + $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$] = $buffer$jscomp$30$$[$offset$jscomp$70$$ + $canOwn_i$jscomp$14_newCapacity$jscomp$inline_76$$];
    }
  }
  $node$jscomp$15_stream$jscomp$12$$.$usedBytes$ = Math.max($node$jscomp$15_stream$jscomp$12$$.$usedBytes$, $position$jscomp$6$$ + $length$jscomp$30$$);
  return $length$jscomp$30$$;
}, $llseek$($stream$jscomp$13$$, $offset$jscomp$71_position$jscomp$7$$, $whence$$) {
  1 === $whence$$ ? $offset$jscomp$71_position$jscomp$7$$ += $stream$jscomp$13$$.position : 2 === $whence$$ && 32768 === ($stream$jscomp$13$$.node.mode & 61440) && ($offset$jscomp$71_position$jscomp$7$$ += $stream$jscomp$13$$.node.$usedBytes$);
  if (0 > $offset$jscomp$71_position$jscomp$7$$) {
    throw new $FS$ErrnoError$$(28);
  }
  return $offset$jscomp$71_position$jscomp$7$$;
}, $mmap$($contents$jscomp$3_stream$jscomp$14$$, $length$jscomp$31$$, $position$jscomp$8$$, $allocated_prot$$, $flags$jscomp$9_ptr$jscomp$7$$) {
  if (32768 !== ($contents$jscomp$3_stream$jscomp$14$$.node.mode & 61440)) {
    throw new $FS$ErrnoError$$(43);
  }
  $contents$jscomp$3_stream$jscomp$14$$ = $contents$jscomp$3_stream$jscomp$14$$.node.$contents$;
  if ($flags$jscomp$9_ptr$jscomp$7$$ & 2 || !$contents$jscomp$3_stream$jscomp$14$$ || $contents$jscomp$3_stream$jscomp$14$$.buffer !== $HEAP8$$.buffer) {
    $allocated_prot$$ = !0;
    $flags$jscomp$9_ptr$jscomp$7$$ = $mmapAlloc$$();
    if (!$flags$jscomp$9_ptr$jscomp$7$$) {
      throw new $FS$ErrnoError$$(48);
    }
    if ($contents$jscomp$3_stream$jscomp$14$$) {
      if (0 < $position$jscomp$8$$ || $position$jscomp$8$$ + $length$jscomp$31$$ < $contents$jscomp$3_stream$jscomp$14$$.length) {
        $contents$jscomp$3_stream$jscomp$14$$.subarray ? $contents$jscomp$3_stream$jscomp$14$$ = $contents$jscomp$3_stream$jscomp$14$$.subarray($position$jscomp$8$$, $position$jscomp$8$$ + $length$jscomp$31$$) : $contents$jscomp$3_stream$jscomp$14$$ = Array.prototype.slice.call($contents$jscomp$3_stream$jscomp$14$$, $position$jscomp$8$$, $position$jscomp$8$$ + $length$jscomp$31$$);
      }
      $HEAP8$$.set($contents$jscomp$3_stream$jscomp$14$$, $flags$jscomp$9_ptr$jscomp$7$$ >>> 0);
    }
  } else {
    $allocated_prot$$ = !1, $flags$jscomp$9_ptr$jscomp$7$$ = $contents$jscomp$3_stream$jscomp$14$$.byteOffset;
  }
  return {$ptr$:$flags$jscomp$9_ptr$jscomp$7$$, $allocated$:$allocated_prot$$};
}, $msync$($stream$jscomp$15$$, $buffer$jscomp$31$$, $offset$jscomp$72$$, $length$jscomp$32$$) {
  $MEMFS$$.$stream_ops$.write($stream$jscomp$15$$, $buffer$jscomp$31$$, 0, $length$jscomp$32$$, $offset$jscomp$72$$, !1);
  return 0;
}}}, $FS_getMode$$ = ($canRead$$, $canWrite$$) => {
  var $mode$jscomp$29$$ = 0;
  $canRead$$ && ($mode$jscomp$29$$ |= 365);
  $canWrite$$ && ($mode$jscomp$29$$ |= 146);
  return $mode$jscomp$29$$;
}, $ERRNO_CODES$$ = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, 
EL2HLT:112, EDEADLK:16, ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, 
ECONNRESET:15, ENOBUFS:42, EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, 
EOWNERDEAD:62, ESTRPIPE:135}, $asyncLoad$$ = async $url$jscomp$28$$ => {
  var $arrayBuffer$$ = await $readAsync$$($url$jscomp$28$$);
  $assert$$($arrayBuffer$$, `Loading data file "${$url$jscomp$28$$}" failed (no arrayBuffer).`);
  return new Uint8Array($arrayBuffer$$);
}, $preloadPlugins$$ = [], $FS_handledByPreloadPlugin$$ = async($byteArray$$, $fullname$$) => {
  "undefined" != typeof $Browser$$ && $Browser$init$$();
  for (var $plugin$$ of $preloadPlugins$$) {
    if ($plugin$$.canHandle($fullname$$)) {
      return $assert$$("AsyncFunction" === $plugin$$.handle.constructor.name, "Filesystem plugin handlers must be async functions (See #24914)"), $plugin$$.handle($byteArray$$, $fullname$$);
    }
  }
  return $byteArray$$;
}, $FS$root$$ = null, $FS$devices$$ = {}, $FS$streams$$ = [], $FS$nextInode$$ = 1, $FS$nameTable$$ = null, $FS$initialized$$ = !1, $FS$ignorePermissions$$ = !0, $FS$readFiles$$ = {}, $FS$ErrnoError$$ = class extends Error {
  name="ErrnoError";
  constructor($errno$jscomp$1$$) {
    super($runtimeInitialized$$ ? $UTF8ToString$$($_strerror$$($errno$jscomp$1$$)) : "");
    this.$errno$ = $errno$jscomp$1$$;
    for (var $key$jscomp$41$$ in $ERRNO_CODES$$) {
      if ($ERRNO_CODES$$[$key$jscomp$41$$] === $errno$jscomp$1$$) {
        this.code = $key$jscomp$41$$;
        break;
      }
    }
  }
}, $FS$FSStream$$ = class {
  $j$={};
  node=null;
  get object() {
    return this.node;
  }
  set object($val$jscomp$3$$) {
    this.node = $val$jscomp$3$$;
  }
  get flags() {
    return this.$j$.flags;
  }
  set flags($val$jscomp$4$$) {
    this.$j$.flags = $val$jscomp$4$$;
  }
  get position() {
    return this.$j$.position;
  }
  set position($val$jscomp$5$$) {
    this.$j$.position = $val$jscomp$5$$;
  }
}, $FS$FSNode$$ = class {
  $node_ops$={};
  $stream_ops$={};
  $mounted$=null;
  constructor($parent$jscomp$12$$, $name$jscomp$90$$, $mode$jscomp$30$$, $rdev$$) {
    $parent$jscomp$12$$ ||= this;
    this.parent = $parent$jscomp$12$$;
    this.$mount$ = $parent$jscomp$12$$.$mount$;
    this.id = $FS$nextInode$$++;
    this.name = $name$jscomp$90$$;
    this.mode = $mode$jscomp$30$$;
    this.rdev = $rdev$$;
    this.atime = this.mtime = this.ctime = Date.now();
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read($val$jscomp$6$$) {
    $val$jscomp$6$$ ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write($val$jscomp$7$$) {
    $val$jscomp$7$$ ? this.mode |= 146 : this.mode &= -147;
  }
  get $isFolder$() {
    return $FS$isDir$$(this.mode);
  }
  get $isDevice$() {
    return 8192 === (this.mode & 61440);
  }
};
function $FS$lookupPath$$($parts$jscomp$1_path$jscomp$45$$, $opts$$ = {}) {
  if (!$parts$jscomp$1_path$jscomp$45$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $opts$$.$follow_mount$ ?? ($opts$$.$follow_mount$ = !0);
  "/" === $parts$jscomp$1_path$jscomp$45$$.charAt(0) || ($parts$jscomp$1_path$jscomp$45$$ = "//" + $parts$jscomp$1_path$jscomp$45$$);
  var $nlinks$$ = 0;
  a: for (; 40 > $nlinks$$; $nlinks$$++) {
    $parts$jscomp$1_path$jscomp$45$$ = $parts$jscomp$1_path$jscomp$45$$.split("/").filter($p$jscomp$6$$ => !!$p$jscomp$6$$);
    for (var $current_link$$ = $FS$root$$, $current_path$$ = "/", $i$jscomp$15$$ = 0; $i$jscomp$15$$ < $parts$jscomp$1_path$jscomp$45$$.length; $i$jscomp$15$$++) {
      var $islast$$ = $i$jscomp$15$$ === $parts$jscomp$1_path$jscomp$45$$.length - 1;
      if ($islast$$ && $opts$$.parent) {
        break;
      }
      if ("." !== $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]) {
        if (".." === $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]) {
          if ($current_path$$ = $PATH$dirname$$($current_path$$), $current_link$$ === $current_link$$.parent) {
            $parts$jscomp$1_path$jscomp$45$$ = $current_path$$ + "/" + $parts$jscomp$1_path$jscomp$45$$.slice($i$jscomp$15$$ + 1).join("/");
            $nlinks$$--;
            continue a;
          } else {
            $current_link$$ = $current_link$$.parent;
          }
        } else {
          $current_path$$ = $PATH$normalize$$($current_path$$ + "/" + $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]);
          try {
            $current_link$$ = $FS$lookupNode$$($current_link$$, $parts$jscomp$1_path$jscomp$45$$[$i$jscomp$15$$]);
          } catch ($e$jscomp$13$$) {
            if (44 === $e$jscomp$13$$?.$errno$ && $islast$$ && $opts$$.$noent_okay$) {
              return {path:$current_path$$};
            }
            throw $e$jscomp$13$$;
          }
          !$current_link$$.$mounted$ || $islast$$ && !$opts$$.$follow_mount$ || ($current_link$$ = $current_link$$.$mounted$.root);
          if (40960 === ($current_link$$.mode & 61440) && (!$islast$$ || $opts$$.$follow$)) {
            if (!$current_link$$.$node_ops$.readlink) {
              throw new $FS$ErrnoError$$(52);
            }
            $current_link$$ = $current_link$$.$node_ops$.readlink($current_link$$);
            "/" === $current_link$$.charAt(0) || ($current_link$$ = $PATH$dirname$$($current_path$$) + "/" + $current_link$$);
            $parts$jscomp$1_path$jscomp$45$$ = $current_link$$ + "/" + $parts$jscomp$1_path$jscomp$45$$.slice($i$jscomp$15$$ + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:$current_path$$, node:$current_link$$};
  }
  throw new $FS$ErrnoError$$(32);
}
function $FS$getPath$$($mount$jscomp$1_node$jscomp$16$$) {
  for (var $path$jscomp$46$$;;) {
    if ($mount$jscomp$1_node$jscomp$16$$ === $mount$jscomp$1_node$jscomp$16$$.parent) {
      return $mount$jscomp$1_node$jscomp$16$$ = $mount$jscomp$1_node$jscomp$16$$.$mount$.$mountpoint$, $path$jscomp$46$$ ? "/" !== $mount$jscomp$1_node$jscomp$16$$[$mount$jscomp$1_node$jscomp$16$$.length - 1] ? `${$mount$jscomp$1_node$jscomp$16$$}/${$path$jscomp$46$$}` : $mount$jscomp$1_node$jscomp$16$$ + $path$jscomp$46$$ : $mount$jscomp$1_node$jscomp$16$$;
    }
    $path$jscomp$46$$ = $path$jscomp$46$$ ? `${$mount$jscomp$1_node$jscomp$16$$.name}/${$path$jscomp$46$$}` : $mount$jscomp$1_node$jscomp$16$$.name;
    $mount$jscomp$1_node$jscomp$16$$ = $mount$jscomp$1_node$jscomp$16$$.parent;
  }
}
function $FS$hashName$$($parentid$$, $name$jscomp$91$$) {
  for (var $hash$$ = 0, $i$jscomp$16$$ = 0; $i$jscomp$16$$ < $name$jscomp$91$$.length; $i$jscomp$16$$++) {
    $hash$$ = ($hash$$ << 5) - $hash$$ + $name$jscomp$91$$.charCodeAt($i$jscomp$16$$) | 0;
  }
  return ($parentid$$ + $hash$$ >>> 0) % $FS$nameTable$$.length;
}
function $FS$hashRemoveNode$$($node$jscomp$18$$) {
  var $current$jscomp$1_hash$jscomp$2$$ = $FS$hashName$$($node$jscomp$18$$.parent.id, $node$jscomp$18$$.name);
  if ($FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$] === $node$jscomp$18$$) {
    $FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$] = $node$jscomp$18$$.$name_next$;
  } else {
    for ($current$jscomp$1_hash$jscomp$2$$ = $FS$nameTable$$[$current$jscomp$1_hash$jscomp$2$$]; $current$jscomp$1_hash$jscomp$2$$;) {
      if ($current$jscomp$1_hash$jscomp$2$$.$name_next$ === $node$jscomp$18$$) {
        $current$jscomp$1_hash$jscomp$2$$.$name_next$ = $node$jscomp$18$$.$name_next$;
        break;
      }
      $current$jscomp$1_hash$jscomp$2$$ = $current$jscomp$1_hash$jscomp$2$$.$name_next$;
    }
  }
}
function $FS$lookupNode$$($parent$jscomp$13$$, $name$jscomp$92$$) {
  var $errCode_errCode$jscomp$inline_82_node$jscomp$19$$ = $FS$isDir$$($parent$jscomp$13$$.mode) ? ($errCode_errCode$jscomp$inline_82_node$jscomp$19$$ = $FS$nodePermissions$$($parent$jscomp$13$$, "x")) ? $errCode_errCode$jscomp$inline_82_node$jscomp$19$$ : $parent$jscomp$13$$.$node_ops$.lookup ? 0 : 2 : 54;
  if ($errCode_errCode$jscomp$inline_82_node$jscomp$19$$) {
    throw new $FS$ErrnoError$$($errCode_errCode$jscomp$inline_82_node$jscomp$19$$);
  }
  for ($errCode_errCode$jscomp$inline_82_node$jscomp$19$$ = $FS$nameTable$$[$FS$hashName$$($parent$jscomp$13$$.id, $name$jscomp$92$$)]; $errCode_errCode$jscomp$inline_82_node$jscomp$19$$; $errCode_errCode$jscomp$inline_82_node$jscomp$19$$ = $errCode_errCode$jscomp$inline_82_node$jscomp$19$$.$name_next$) {
    var $nodeName$$ = $errCode_errCode$jscomp$inline_82_node$jscomp$19$$.name;
    if ($errCode_errCode$jscomp$inline_82_node$jscomp$19$$.parent.id === $parent$jscomp$13$$.id && $nodeName$$ === $name$jscomp$92$$) {
      return $errCode_errCode$jscomp$inline_82_node$jscomp$19$$;
    }
  }
  return $parent$jscomp$13$$.$node_ops$.lookup($parent$jscomp$13$$, $name$jscomp$92$$);
}
function $FS$createNode$$($node$jscomp$20_parent$jscomp$14$$, $hash$jscomp$inline_85_name$jscomp$93$$, $mode$jscomp$31$$, $rdev$jscomp$1$$) {
  $assert$$("object" == typeof $node$jscomp$20_parent$jscomp$14$$);
  $node$jscomp$20_parent$jscomp$14$$ = new $FS$FSNode$$($node$jscomp$20_parent$jscomp$14$$, $hash$jscomp$inline_85_name$jscomp$93$$, $mode$jscomp$31$$, $rdev$jscomp$1$$);
  $hash$jscomp$inline_85_name$jscomp$93$$ = $FS$hashName$$($node$jscomp$20_parent$jscomp$14$$.parent.id, $node$jscomp$20_parent$jscomp$14$$.name);
  $node$jscomp$20_parent$jscomp$14$$.$name_next$ = $FS$nameTable$$[$hash$jscomp$inline_85_name$jscomp$93$$];
  return $FS$nameTable$$[$hash$jscomp$inline_85_name$jscomp$93$$] = $node$jscomp$20_parent$jscomp$14$$;
}
function $FS$isDir$$($mode$jscomp$33$$) {
  return 16384 === ($mode$jscomp$33$$ & 61440);
}
function $FS$flagsToPermissionString$$($flag$jscomp$3$$) {
  var $perms$$ = ["r", "w", "rw"][$flag$jscomp$3$$ & 3];
  $flag$jscomp$3$$ & 512 && ($perms$$ += "w");
  return $perms$$;
}
function $FS$nodePermissions$$($node$jscomp$24$$, $perms$jscomp$1$$) {
  if ($FS$ignorePermissions$$) {
    return 0;
  }
  if (!$perms$jscomp$1$$.includes("r") || $node$jscomp$24$$.mode & 292) {
    if ($perms$jscomp$1$$.includes("w") && !($node$jscomp$24$$.mode & 146) || $perms$jscomp$1$$.includes("x") && !($node$jscomp$24$$.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}
function $FS$mayCreate$$($dir$jscomp$2$$, $name$jscomp$94$$) {
  if (!$FS$isDir$$($dir$jscomp$2$$.mode)) {
    return 54;
  }
  try {
    return $FS$lookupNode$$($dir$jscomp$2$$, $name$jscomp$94$$), 20;
  } catch ($e$jscomp$14$$) {
  }
  return $FS$nodePermissions$$($dir$jscomp$2$$, "wx");
}
function $FS$mayDelete$$($dir$jscomp$3_errCode$jscomp$2$$, $name$jscomp$95$$, $isdir$$) {
  try {
    var $node$jscomp$26$$ = $FS$lookupNode$$($dir$jscomp$3_errCode$jscomp$2$$, $name$jscomp$95$$);
  } catch ($e$jscomp$15$$) {
    return $e$jscomp$15$$.$errno$;
  }
  if ($dir$jscomp$3_errCode$jscomp$2$$ = $FS$nodePermissions$$($dir$jscomp$3_errCode$jscomp$2$$, "wx")) {
    return $dir$jscomp$3_errCode$jscomp$2$$;
  }
  if ($isdir$$) {
    if (!$FS$isDir$$($node$jscomp$26$$.mode)) {
      return 54;
    }
    if ($node$jscomp$26$$ === $node$jscomp$26$$.parent || "/" === $FS$getPath$$($node$jscomp$26$$)) {
      return 10;
    }
  } else {
    if ($FS$isDir$$($node$jscomp$26$$.mode)) {
      return 31;
    }
  }
  return 0;
}
function $FS$checkOpExists$$($op$$, $err$jscomp$4$$) {
  if (!$op$$) {
    throw new $FS$ErrnoError$$($err$jscomp$4$$);
  }
  return $op$$;
}
function $FS$getStreamChecked$$($fd$jscomp$22_stream$jscomp$16$$) {
  $fd$jscomp$22_stream$jscomp$16$$ = $FS$streams$$[$fd$jscomp$22_stream$jscomp$16$$];
  if (!$fd$jscomp$22_stream$jscomp$16$$) {
    throw new $FS$ErrnoError$$(8);
  }
  return $fd$jscomp$22_stream$jscomp$16$$;
}
function $FS$createStream$$($stream$jscomp$17$$, $fd$jscomp$24_fd$jscomp$inline_87$$ = -1) {
  $assert$$(-1 <= $fd$jscomp$24_fd$jscomp$inline_87$$);
  $stream$jscomp$17$$ = Object.assign(new $FS$FSStream$$(), $stream$jscomp$17$$);
  if (-1 == $fd$jscomp$24_fd$jscomp$inline_87$$) {
    a: {
      for ($fd$jscomp$24_fd$jscomp$inline_87$$ = 0; 4096 >= $fd$jscomp$24_fd$jscomp$inline_87$$; $fd$jscomp$24_fd$jscomp$inline_87$$++) {
        if (!$FS$streams$$[$fd$jscomp$24_fd$jscomp$inline_87$$]) {
          break a;
        }
      }
      throw new $FS$ErrnoError$$(33);
    }
  }
  $stream$jscomp$17$$.fd = $fd$jscomp$24_fd$jscomp$inline_87$$;
  return $FS$streams$$[$fd$jscomp$24_fd$jscomp$inline_87$$] = $stream$jscomp$17$$;
}
function $FS$dupStream$$($origStream_stream$jscomp$18$$, $fd$jscomp$26$$ = -1) {
  $origStream_stream$jscomp$18$$ = $FS$createStream$$($origStream_stream$jscomp$18$$, $fd$jscomp$26$$);
  $origStream_stream$jscomp$18$$.$stream_ops$?.$dup$?.($origStream_stream$jscomp$18$$);
  return $origStream_stream$jscomp$18$$;
}
function $FS$doSetAttr$$($node$jscomp$28$$, $attr$jscomp$2$$) {
  var $setattr$$ = null?.$stream_ops$.$setattr$, $arg$jscomp$8$$ = $setattr$$ ? null : $node$jscomp$28$$;
  $setattr$$ ??= $node$jscomp$28$$.$node_ops$.$setattr$;
  $FS$checkOpExists$$($setattr$$, 63);
  $setattr$$($arg$jscomp$8$$, $attr$jscomp$2$$);
}
var $FS$chrdev_stream_ops$$ = {open($stream$jscomp$20$$) {
  $stream$jscomp$20$$.$stream_ops$ = $FS$devices$$[$stream$jscomp$20$$.node.rdev].$stream_ops$;
  $stream$jscomp$20$$.$stream_ops$.open?.($stream$jscomp$20$$);
}, $llseek$() {
  throw new $FS$ErrnoError$$(70);
}};
function $FS$registerDevice$$($dev$jscomp$5$$, $ops$jscomp$1$$) {
  $FS$devices$$[$dev$jscomp$5$$] = {$stream_ops$:$ops$jscomp$1$$};
}
function $FS$mount$$($mountRoot_type$jscomp$175$$, $mount$jscomp$4_mountpoint$$) {
  if ("string" == typeof $mountRoot_type$jscomp$175$$) {
    throw $mountRoot_type$jscomp$175$$;
  }
  var $root$jscomp$4$$ = "/" === $mount$jscomp$4_mountpoint$$, $pseudo$$ = !$mount$jscomp$4_mountpoint$$;
  if ($root$jscomp$4$$ && $FS$root$$) {
    throw new $FS$ErrnoError$$(10);
  }
  if (!$root$jscomp$4$$ && !$pseudo$$) {
    var $lookup_node$jscomp$29$$ = $FS$lookupPath$$($mount$jscomp$4_mountpoint$$, {$follow_mount$:!1});
    $mount$jscomp$4_mountpoint$$ = $lookup_node$jscomp$29$$.path;
    $lookup_node$jscomp$29$$ = $lookup_node$jscomp$29$$.node;
    if ($lookup_node$jscomp$29$$.$mounted$) {
      throw new $FS$ErrnoError$$(10);
    }
    if (!$FS$isDir$$($lookup_node$jscomp$29$$.mode)) {
      throw new $FS$ErrnoError$$(54);
    }
  }
  $mount$jscomp$4_mountpoint$$ = {type:$mountRoot_type$jscomp$175$$, $opts$:{}, $mountpoint$:$mount$jscomp$4_mountpoint$$, $mounts$:[]};
  $mountRoot_type$jscomp$175$$ = $mountRoot_type$jscomp$175$$.$mount$($mount$jscomp$4_mountpoint$$);
  $mountRoot_type$jscomp$175$$.$mount$ = $mount$jscomp$4_mountpoint$$;
  $mount$jscomp$4_mountpoint$$.root = $mountRoot_type$jscomp$175$$;
  $root$jscomp$4$$ ? $FS$root$$ = $mountRoot_type$jscomp$175$$ : $lookup_node$jscomp$29$$ && ($lookup_node$jscomp$29$$.$mounted$ = $mount$jscomp$4_mountpoint$$, $lookup_node$jscomp$29$$.$mount$ && $lookup_node$jscomp$29$$.$mount$.$mounts$.push($mount$jscomp$4_mountpoint$$));
}
function $FS$mknod$$($name$jscomp$97_path$jscomp$47$$, $mode$jscomp$39$$, $dev$jscomp$7$$) {
  var $parent$jscomp$16$$ = $FS$lookupPath$$($name$jscomp$97_path$jscomp$47$$, {parent:!0}).node;
  $name$jscomp$97_path$jscomp$47$$ = $PATH$basename$$($name$jscomp$97_path$jscomp$47$$);
  if (!$name$jscomp$97_path$jscomp$47$$) {
    throw new $FS$ErrnoError$$(28);
  }
  if ("." === $name$jscomp$97_path$jscomp$47$$ || ".." === $name$jscomp$97_path$jscomp$47$$) {
    throw new $FS$ErrnoError$$(20);
  }
  var $errCode$jscomp$5$$ = $FS$mayCreate$$($parent$jscomp$16$$, $name$jscomp$97_path$jscomp$47$$);
  if ($errCode$jscomp$5$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$5$$);
  }
  if (!$parent$jscomp$16$$.$node_ops$.$mknod$) {
    throw new $FS$ErrnoError$$(63);
  }
  return $parent$jscomp$16$$.$node_ops$.$mknod$($parent$jscomp$16$$, $name$jscomp$97_path$jscomp$47$$, $mode$jscomp$39$$, $dev$jscomp$7$$);
}
function $FS$create$$($path$jscomp$49$$, $mode$jscomp$40$$ = 438) {
  return $FS$mknod$$($path$jscomp$49$$, $mode$jscomp$40$$ & 4095 | 32768, 0);
}
function $FS$mkdir$$($path$jscomp$50$$) {
  return $FS$mknod$$($path$jscomp$50$$, 16895, 0);
}
function $FS$mkdev$$($path$jscomp$52$$, $mode$jscomp$43$$, $dev$jscomp$8$$) {
  "undefined" == typeof $dev$jscomp$8$$ && ($dev$jscomp$8$$ = $mode$jscomp$43$$, $mode$jscomp$43$$ = 438);
  return $FS$mknod$$($path$jscomp$52$$, $mode$jscomp$43$$ | 8192, $dev$jscomp$8$$);
}
function $FS$symlink$$($oldpath$jscomp$1$$, $newname$jscomp$1_newpath$$) {
  if (!$PATH_FS$resolve$$($oldpath$jscomp$1$$)) {
    throw new $FS$ErrnoError$$(44);
  }
  var $parent$jscomp$17$$ = $FS$lookupPath$$($newname$jscomp$1_newpath$$, {parent:!0}).node;
  if (!$parent$jscomp$17$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $newname$jscomp$1_newpath$$ = $PATH$basename$$($newname$jscomp$1_newpath$$);
  var $errCode$jscomp$6$$ = $FS$mayCreate$$($parent$jscomp$17$$, $newname$jscomp$1_newpath$$);
  if ($errCode$jscomp$6$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$6$$);
  }
  if (!$parent$jscomp$17$$.$node_ops$.symlink) {
    throw new $FS$ErrnoError$$(63);
  }
  $parent$jscomp$17$$.$node_ops$.symlink($parent$jscomp$17$$, $newname$jscomp$1_newpath$$, $oldpath$jscomp$1$$);
}
function $FS$unlink$$($name$jscomp$99_path$jscomp$55$$) {
  var $parent$jscomp$19$$ = $FS$lookupPath$$($name$jscomp$99_path$jscomp$55$$, {parent:!0}).node;
  if (!$parent$jscomp$19$$) {
    throw new $FS$ErrnoError$$(44);
  }
  $name$jscomp$99_path$jscomp$55$$ = $PATH$basename$$($name$jscomp$99_path$jscomp$55$$);
  var $node$jscomp$34$$ = $FS$lookupNode$$($parent$jscomp$19$$, $name$jscomp$99_path$jscomp$55$$), $errCode$jscomp$9$$ = $FS$mayDelete$$($parent$jscomp$19$$, $name$jscomp$99_path$jscomp$55$$, !1);
  if ($errCode$jscomp$9$$) {
    throw new $FS$ErrnoError$$($errCode$jscomp$9$$);
  }
  if (!$parent$jscomp$19$$.$node_ops$.unlink) {
    throw new $FS$ErrnoError$$(63);
  }
  if ($node$jscomp$34$$.$mounted$) {
    throw new $FS$ErrnoError$$(10);
  }
  $parent$jscomp$19$$.$node_ops$.unlink($parent$jscomp$19$$, $name$jscomp$99_path$jscomp$55$$);
  $FS$hashRemoveNode$$($node$jscomp$34$$);
}
function $FS$stat$$($node$jscomp$35_path$jscomp$57$$, $dontFollow$$) {
  $node$jscomp$35_path$jscomp$57$$ = $FS$lookupPath$$($node$jscomp$35_path$jscomp$57$$, {$follow$:!$dontFollow$$}).node;
  return $FS$checkOpExists$$($node$jscomp$35_path$jscomp$57$$.$node_ops$.$getattr$, 63)($node$jscomp$35_path$jscomp$57$$);
}
function $FS$chmod$$($node$jscomp$38_path$jscomp$59$$, $mode$jscomp$45$$) {
  $node$jscomp$38_path$jscomp$59$$ = "string" == typeof $node$jscomp$38_path$jscomp$59$$ ? $FS$lookupPath$$($node$jscomp$38_path$jscomp$59$$, {$follow$:!0}).node : $node$jscomp$38_path$jscomp$59$$;
  $FS$doSetAttr$$($node$jscomp$38_path$jscomp$59$$, {mode:$mode$jscomp$45$$ & 4095 | $node$jscomp$38_path$jscomp$59$$.mode & -4096, ctime:Date.now(), $dontFollow$:void 0});
}
function $FS$open$$($lookup$jscomp$14_path$jscomp$65$$, $JSCompiler_temp$jscomp$5_flags$jscomp$12$$, $mode$jscomp$48$$ = 438) {
  if ("" === $lookup$jscomp$14_path$jscomp$65$$) {
    throw new $FS$ErrnoError$$(44);
  }
  if ("string" == typeof $JSCompiler_temp$jscomp$5_flags$jscomp$12$$) {
    var $flags$jscomp$inline_99_node$jscomp$44$$ = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[$JSCompiler_temp$jscomp$5_flags$jscomp$12$$];
    if ("undefined" == typeof $flags$jscomp$inline_99_node$jscomp$44$$) {
      throw Error(`Unknown file open mode: ${$JSCompiler_temp$jscomp$5_flags$jscomp$12$$}`);
    }
    $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ = $flags$jscomp$inline_99_node$jscomp$44$$;
  }
  $mode$jscomp$48$$ = $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 64 ? $mode$jscomp$48$$ & 4095 | 32768 : 0;
  if ("object" == typeof $lookup$jscomp$14_path$jscomp$65$$) {
    $flags$jscomp$inline_99_node$jscomp$44$$ = $lookup$jscomp$14_path$jscomp$65$$;
  } else {
    var $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$ = $lookup$jscomp$14_path$jscomp$65$$.endsWith("/");
    $lookup$jscomp$14_path$jscomp$65$$ = $FS$lookupPath$$($lookup$jscomp$14_path$jscomp$65$$, {$follow$:!($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 131072), $noent_okay$:!0});
    $flags$jscomp$inline_99_node$jscomp$44$$ = $lookup$jscomp$14_path$jscomp$65$$.node;
    $lookup$jscomp$14_path$jscomp$65$$ = $lookup$jscomp$14_path$jscomp$65$$.path;
  }
  var $created$$ = !1;
  if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 64) {
    if ($flags$jscomp$inline_99_node$jscomp$44$$) {
      if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 128) {
        throw new $FS$ErrnoError$$(20);
      }
    } else {
      if ($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$) {
        throw new $FS$ErrnoError$$(31);
      }
      $flags$jscomp$inline_99_node$jscomp$44$$ = $FS$mknod$$($lookup$jscomp$14_path$jscomp$65$$, $mode$jscomp$48$$ | 511, 0);
      $created$$ = !0;
    }
  }
  if (!$flags$jscomp$inline_99_node$jscomp$44$$) {
    throw new $FS$ErrnoError$$(44);
  }
  8192 === ($flags$jscomp$inline_99_node$jscomp$44$$.mode & 61440) && ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ &= -513);
  if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 65536 && !$FS$isDir$$($flags$jscomp$inline_99_node$jscomp$44$$.mode)) {
    throw new $FS$ErrnoError$$(54);
  }
  if (!$created$$ && ($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$ = $flags$jscomp$inline_99_node$jscomp$44$$ ? 40960 === ($flags$jscomp$inline_99_node$jscomp$44$$.mode & 61440) ? 32 : $FS$isDir$$($flags$jscomp$inline_99_node$jscomp$44$$.mode) && ("r" !== $FS$flagsToPermissionString$$($JSCompiler_temp$jscomp$5_flags$jscomp$12$$) || $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 576) ? 31 : $FS$nodePermissions$$($flags$jscomp$inline_99_node$jscomp$44$$, 
  $FS$flagsToPermissionString$$($JSCompiler_temp$jscomp$5_flags$jscomp$12$$)) : 44)) {
    throw new $FS$ErrnoError$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$);
  }
  if ($JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 512 && !$created$$) {
    $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$ = $flags$jscomp$inline_99_node$jscomp$44$$;
    $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$ = "string" == typeof $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$ ? $FS$lookupPath$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$, {$follow$:!0}).node : $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$;
    if ($FS$isDir$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$.mode)) {
      throw new $FS$ErrnoError$$(31);
    }
    if (32768 !== ($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$.mode & 61440)) {
      throw new $FS$ErrnoError$$(28);
    }
    var $errCode$jscomp$inline_444$$ = $FS$nodePermissions$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$, "w");
    if ($errCode$jscomp$inline_444$$) {
      throw new $FS$ErrnoError$$($errCode$jscomp$inline_444$$);
    }
    $FS$doSetAttr$$($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$, {size:0, timestamp:Date.now()});
  }
  $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ &= -131713;
  $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$ = $FS$createStream$$({node:$flags$jscomp$inline_99_node$jscomp$44$$, path:$FS$getPath$$($flags$jscomp$inline_99_node$jscomp$44$$), flags:$JSCompiler_temp$jscomp$5_flags$jscomp$12$$, seekable:!0, position:0, $stream_ops$:$flags$jscomp$inline_99_node$jscomp$44$$.$stream_ops$, $ungotten$:[], error:!1});
  $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$.$stream_ops$.open && $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$.$stream_ops$.open($errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$);
  $created$$ && $FS$chmod$$($flags$jscomp$inline_99_node$jscomp$44$$, $mode$jscomp$48$$ & 511);
  !$Module$$.logReadFiles || $JSCompiler_temp$jscomp$5_flags$jscomp$12$$ & 1 || $lookup$jscomp$14_path$jscomp$65$$ in $FS$readFiles$$ || ($FS$readFiles$$[$lookup$jscomp$14_path$jscomp$65$$] = 1);
  return $errCode$jscomp$11_isDirPath_node$jscomp$inline_442_path$jscomp$inline_101_stream$jscomp$29$$;
}
function $FS$close$$($stream$jscomp$30$$) {
  if (null === $stream$jscomp$30$$.fd) {
    throw new $FS$ErrnoError$$(8);
  }
  $stream$jscomp$30$$.$getdents$ && ($stream$jscomp$30$$.$getdents$ = null);
  try {
    $stream$jscomp$30$$.$stream_ops$.close && $stream$jscomp$30$$.$stream_ops$.close($stream$jscomp$30$$);
  } catch ($e$jscomp$19$$) {
    throw $e$jscomp$19$$;
  } finally {
    $FS$streams$$[$stream$jscomp$30$$.fd] = null;
  }
  $stream$jscomp$30$$.fd = null;
}
function $FS$llseek$$($stream$jscomp$32$$, $offset$jscomp$73$$, $whence$jscomp$1$$) {
  if (null === $stream$jscomp$32$$.fd) {
    throw new $FS$ErrnoError$$(8);
  }
  if (!$stream$jscomp$32$$.seekable || !$stream$jscomp$32$$.$stream_ops$.$llseek$) {
    throw new $FS$ErrnoError$$(70);
  }
  if (0 != $whence$jscomp$1$$ && 1 != $whence$jscomp$1$$ && 2 != $whence$jscomp$1$$) {
    throw new $FS$ErrnoError$$(28);
  }
  $stream$jscomp$32$$.position = $stream$jscomp$32$$.$stream_ops$.$llseek$($stream$jscomp$32$$, $offset$jscomp$73$$, $whence$jscomp$1$$);
  $stream$jscomp$32$$.$ungotten$ = [];
  return $stream$jscomp$32$$.position;
}
function $FS$write$$($stream$jscomp$34$$, $buffer$jscomp$33_bytesWritten$jscomp$1$$, $offset$jscomp$75$$, $length$jscomp$34$$, $position$jscomp$10$$, $canOwn$jscomp$3$$) {
  $assert$$(0 <= $offset$jscomp$75$$);
  if (0 > $length$jscomp$34$$ || 0 > $position$jscomp$10$$) {
    throw new $FS$ErrnoError$$(28);
  }
  if (null === $stream$jscomp$34$$.fd) {
    throw new $FS$ErrnoError$$(8);
  }
  if (0 === ($stream$jscomp$34$$.flags & 2097155)) {
    throw new $FS$ErrnoError$$(8);
  }
  if ($FS$isDir$$($stream$jscomp$34$$.node.mode)) {
    throw new $FS$ErrnoError$$(31);
  }
  if (!$stream$jscomp$34$$.$stream_ops$.write) {
    throw new $FS$ErrnoError$$(28);
  }
  $stream$jscomp$34$$.seekable && $stream$jscomp$34$$.flags & 1024 && $FS$llseek$$($stream$jscomp$34$$, 0, 2);
  var $seeking$jscomp$1$$ = "undefined" != typeof $position$jscomp$10$$;
  if (!$seeking$jscomp$1$$) {
    $position$jscomp$10$$ = $stream$jscomp$34$$.position;
  } else if (!$stream$jscomp$34$$.seekable) {
    throw new $FS$ErrnoError$$(70);
  }
  $buffer$jscomp$33_bytesWritten$jscomp$1$$ = $stream$jscomp$34$$.$stream_ops$.write($stream$jscomp$34$$, $buffer$jscomp$33_bytesWritten$jscomp$1$$, $offset$jscomp$75$$, $length$jscomp$34$$, $position$jscomp$10$$, $canOwn$jscomp$3$$);
  $seeking$jscomp$1$$ || ($stream$jscomp$34$$.position += $buffer$jscomp$33_bytesWritten$jscomp$1$$);
  return $buffer$jscomp$33_bytesWritten$jscomp$1$$;
}
function $FS$createPath$$($parent$jscomp$21$$, $parts$jscomp$2_path$jscomp$71$$) {
  $parent$jscomp$21$$ = "string" == typeof $parent$jscomp$21$$ ? $parent$jscomp$21$$ : $FS$getPath$$($parent$jscomp$21$$);
  for ($parts$jscomp$2_path$jscomp$71$$ = $parts$jscomp$2_path$jscomp$71$$.split("/").reverse(); $parts$jscomp$2_path$jscomp$71$$.length;) {
    var $part$$ = $parts$jscomp$2_path$jscomp$71$$.pop();
    if ($part$$) {
      var $current$jscomp$3$$ = $PATH$normalize$$($parent$jscomp$21$$ + "/" + $part$$);
      try {
        $FS$mkdir$$($current$jscomp$3$$);
      } catch ($e$jscomp$22$$) {
        if (20 != $e$jscomp$22$$.$errno$) {
          throw $e$jscomp$22$$;
        }
      }
      $parent$jscomp$21$$ = $current$jscomp$3$$;
    }
  }
  return $current$jscomp$3$$;
}
function $FS$createFile$$($parent$jscomp$22_path$jscomp$72$$, $name$jscomp$101$$, $canRead$jscomp$4$$, $canWrite$jscomp$4$$) {
  $parent$jscomp$22_path$jscomp$72$$ = $PATH$normalize$$(("string" == typeof $parent$jscomp$22_path$jscomp$72$$ ? $parent$jscomp$22_path$jscomp$72$$ : $FS$getPath$$($parent$jscomp$22_path$jscomp$72$$)) + "/" + $name$jscomp$101$$);
  return $FS$create$$($parent$jscomp$22_path$jscomp$72$$, $FS_getMode$$($canRead$jscomp$4$$, $canWrite$jscomp$4$$));
}
function $FS$createDataFile$$($mode$jscomp$50_parent$jscomp$23$$, $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$, $data$jscomp$93$$, $canRead$jscomp$5_i$jscomp$17$$, $canWrite$jscomp$5_len$jscomp$8$$, $canOwn$jscomp$4$$) {
  var $node$jscomp$46_path$jscomp$73$$ = $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$;
  $mode$jscomp$50_parent$jscomp$23$$ && ($mode$jscomp$50_parent$jscomp$23$$ = "string" == typeof $mode$jscomp$50_parent$jscomp$23$$ ? $mode$jscomp$50_parent$jscomp$23$$ : $FS$getPath$$($mode$jscomp$50_parent$jscomp$23$$), $node$jscomp$46_path$jscomp$73$$ = $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$ ? $PATH$normalize$$($mode$jscomp$50_parent$jscomp$23$$ + "/" + $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$) : $mode$jscomp$50_parent$jscomp$23$$);
  $mode$jscomp$50_parent$jscomp$23$$ = $FS_getMode$$($canRead$jscomp$5_i$jscomp$17$$, $canWrite$jscomp$5_len$jscomp$8$$);
  $node$jscomp$46_path$jscomp$73$$ = $FS$create$$($node$jscomp$46_path$jscomp$73$$, $mode$jscomp$50_parent$jscomp$23$$);
  if ($data$jscomp$93$$) {
    if ("string" == typeof $data$jscomp$93$$) {
      $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$ = Array($data$jscomp$93$$.length);
      $canRead$jscomp$5_i$jscomp$17$$ = 0;
      for ($canWrite$jscomp$5_len$jscomp$8$$ = $data$jscomp$93$$.length; $canRead$jscomp$5_i$jscomp$17$$ < $canWrite$jscomp$5_len$jscomp$8$$; ++$canRead$jscomp$5_i$jscomp$17$$) {
        $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$[$canRead$jscomp$5_i$jscomp$17$$] = $data$jscomp$93$$.charCodeAt($canRead$jscomp$5_i$jscomp$17$$);
      }
      $data$jscomp$93$$ = $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$;
    }
    $FS$chmod$$($node$jscomp$46_path$jscomp$73$$, $mode$jscomp$50_parent$jscomp$23$$ | 146);
    $arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$ = $FS$open$$($node$jscomp$46_path$jscomp$73$$, 577);
    $FS$write$$($arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$, $data$jscomp$93$$, 0, $data$jscomp$93$$.length, 0, $canOwn$jscomp$4$$);
    $FS$close$$($arr$jscomp$2_name$jscomp$102_stream$jscomp$43$$);
    $FS$chmod$$($node$jscomp$46_path$jscomp$73$$, $mode$jscomp$50_parent$jscomp$23$$);
  }
}
function $FS$createDevice$$($parent$jscomp$24_path$jscomp$74$$, $mode$jscomp$51_name$jscomp$103$$, $input$jscomp$14$$, $output$jscomp$4$$) {
  $parent$jscomp$24_path$jscomp$74$$ = $PATH$normalize$$(("string" == typeof $parent$jscomp$24_path$jscomp$74$$ ? $parent$jscomp$24_path$jscomp$74$$ : $FS$getPath$$($parent$jscomp$24_path$jscomp$74$$)) + "/" + $mode$jscomp$51_name$jscomp$103$$);
  $mode$jscomp$51_name$jscomp$103$$ = $FS_getMode$$(!!$input$jscomp$14$$, !!$output$jscomp$4$$);
  $FS$createDevice$$.$major$ ?? ($FS$createDevice$$.$major$ = 64);
  var $dev$jscomp$9$$ = $FS$createDevice$$.$major$++ << 8 | 0;
  $FS$registerDevice$$($dev$jscomp$9$$, {open($stream$jscomp$44$$) {
    $stream$jscomp$44$$.seekable = !1;
  }, close() {
    $output$jscomp$4$$?.buffer?.length && $output$jscomp$4$$(10);
  }, read($stream$jscomp$46$$, $buffer$jscomp$36$$, $offset$jscomp$78$$, $length$jscomp$39$$) {
    for (var $bytesRead$jscomp$3$$ = 0, $i$jscomp$18$$ = 0; $i$jscomp$18$$ < $length$jscomp$39$$; $i$jscomp$18$$++) {
      try {
        var $result$jscomp$6$$ = $input$jscomp$14$$();
      } catch ($e$jscomp$23$$) {
        throw new $FS$ErrnoError$$(29);
      }
      if (void 0 === $result$jscomp$6$$ && 0 === $bytesRead$jscomp$3$$) {
        throw new $FS$ErrnoError$$(6);
      }
      if (null === $result$jscomp$6$$ || void 0 === $result$jscomp$6$$) {
        break;
      }
      $bytesRead$jscomp$3$$++;
      $buffer$jscomp$36$$[$offset$jscomp$78$$ + $i$jscomp$18$$] = $result$jscomp$6$$;
    }
    $bytesRead$jscomp$3$$ && ($stream$jscomp$46$$.node.atime = Date.now());
    return $bytesRead$jscomp$3$$;
  }, write($stream$jscomp$47$$, $buffer$jscomp$37$$, $offset$jscomp$79$$, $length$jscomp$40$$) {
    for (var $i$jscomp$19$$ = 0; $i$jscomp$19$$ < $length$jscomp$40$$; $i$jscomp$19$$++) {
      try {
        $output$jscomp$4$$($buffer$jscomp$37$$[$offset$jscomp$79$$ + $i$jscomp$19$$]);
      } catch ($e$jscomp$24$$) {
        throw new $FS$ErrnoError$$(29);
      }
    }
    $length$jscomp$40$$ && ($stream$jscomp$47$$.node.mtime = $stream$jscomp$47$$.node.ctime = Date.now());
    return $i$jscomp$19$$;
  }});
  return $FS$mkdev$$($parent$jscomp$24_path$jscomp$74$$, $mode$jscomp$51_name$jscomp$103$$, $dev$jscomp$9$$);
}
function $FS$forceLoadFile$$($obj$jscomp$33$$) {
  if (!($obj$jscomp$33$$.$isDevice$ || $obj$jscomp$33$$.$isFolder$ || $obj$jscomp$33$$.link || $obj$jscomp$33$$.$contents$)) {
    if ("undefined" != typeof XMLHttpRequest) {
      throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    }
    try {
      $obj$jscomp$33$$.$contents$ = $readBinary$$($obj$jscomp$33$$.url);
    } catch ($e$jscomp$25$$) {
      throw new $FS$ErrnoError$$(29);
    }
  }
}
function $FS$createLazyFile$$($parent$jscomp$25$$, $name$jscomp$104$$, $url$jscomp$31$$, $canRead$jscomp$6$$, $canWrite$jscomp$6$$) {
  function $writeChunks$$($contents$jscomp$4_stream$jscomp$48$$, $buffer$jscomp$38$$, $offset$jscomp$80$$, $length$jscomp$41_size$jscomp$25$$, $position$jscomp$12$$) {
    $contents$jscomp$4_stream$jscomp$48$$ = $contents$jscomp$4_stream$jscomp$48$$.node.$contents$;
    if ($position$jscomp$12$$ >= $contents$jscomp$4_stream$jscomp$48$$.length) {
      return 0;
    }
    $length$jscomp$41_size$jscomp$25$$ = Math.min($contents$jscomp$4_stream$jscomp$48$$.length - $position$jscomp$12$$, $length$jscomp$41_size$jscomp$25$$);
    $assert$$(0 <= $length$jscomp$41_size$jscomp$25$$);
    if ($contents$jscomp$4_stream$jscomp$48$$.slice) {
      for (var $i$jscomp$20$$ = 0; $i$jscomp$20$$ < $length$jscomp$41_size$jscomp$25$$; $i$jscomp$20$$++) {
        $buffer$jscomp$38$$[$offset$jscomp$80$$ + $i$jscomp$20$$] = $contents$jscomp$4_stream$jscomp$48$$[$position$jscomp$12$$ + $i$jscomp$20$$];
      }
    } else {
      for ($i$jscomp$20$$ = 0; $i$jscomp$20$$ < $length$jscomp$41_size$jscomp$25$$; $i$jscomp$20$$++) {
        $buffer$jscomp$38$$[$offset$jscomp$80$$ + $i$jscomp$20$$] = $contents$jscomp$4_stream$jscomp$48$$.get($position$jscomp$12$$ + $i$jscomp$20$$);
      }
    }
    return $length$jscomp$41_size$jscomp$25$$;
  }
  class $LazyUint8Array$$ {
    $m$=!1;
    $j$=[];
    $l$=void 0;
    $s$=0;
    $o$=0;
    get($idx$jscomp$3$$) {
      if (!($idx$jscomp$3$$ > this.length - 1 || 0 > $idx$jscomp$3$$)) {
        var $chunkOffset$$ = $idx$jscomp$3$$ % this.chunkSize;
        return this.$l$($idx$jscomp$3$$ / this.chunkSize | 0)[$chunkOffset$$];
      }
    }
    $A$($getter$$) {
      this.$l$ = $getter$$;
    }
    $u$() {
      var $usesGzip_xhr$jscomp$2$$ = new XMLHttpRequest();
      $usesGzip_xhr$jscomp$2$$.open("HEAD", $url$jscomp$31$$, !1);
      $usesGzip_xhr$jscomp$2$$.send(null);
      if (!(200 <= $usesGzip_xhr$jscomp$2$$.status && 300 > $usesGzip_xhr$jscomp$2$$.status || 304 === $usesGzip_xhr$jscomp$2$$.status)) {
        throw Error("Couldn't load " + $url$jscomp$31$$ + ". Status: " + $usesGzip_xhr$jscomp$2$$.status);
      }
      var $datalength$$ = Number($usesGzip_xhr$jscomp$2$$.getResponseHeader("Content-length")), $header$jscomp$2$$, $hasByteServing$$ = ($header$jscomp$2$$ = $usesGzip_xhr$jscomp$2$$.getResponseHeader("Accept-Ranges")) && "bytes" === $header$jscomp$2$$;
      $usesGzip_xhr$jscomp$2$$ = ($header$jscomp$2$$ = $usesGzip_xhr$jscomp$2$$.getResponseHeader("Content-Encoding")) && "gzip" === $header$jscomp$2$$;
      var $chunkSize$$ = 1048576;
      $hasByteServing$$ || ($chunkSize$$ = $datalength$$);
      var $lazyArray$jscomp$1$$ = this;
      $lazyArray$jscomp$1$$.$A$($chunkNum$jscomp$1$$ => {
        var $JSCompiler_inline_result$jscomp$15_start$jscomp$22$$ = $chunkNum$jscomp$1$$ * $chunkSize$$, $end$jscomp$21_to$jscomp$inline_115$$ = ($chunkNum$jscomp$1$$ + 1) * $chunkSize$$ - 1;
        $end$jscomp$21_to$jscomp$inline_115$$ = Math.min($end$jscomp$21_to$jscomp$inline_115$$, $datalength$$ - 1);
        if ("undefined" == typeof $lazyArray$jscomp$1$$.$j$[$chunkNum$jscomp$1$$]) {
          var $JSCompiler_temp_const$jscomp$14$$ = $lazyArray$jscomp$1$$.$j$;
          if ($JSCompiler_inline_result$jscomp$15_start$jscomp$22$$ > $end$jscomp$21_to$jscomp$inline_115$$) {
            throw Error("invalid range (" + $JSCompiler_inline_result$jscomp$15_start$jscomp$22$$ + ", " + $end$jscomp$21_to$jscomp$inline_115$$ + ") or no bytes requested!");
          }
          if ($end$jscomp$21_to$jscomp$inline_115$$ > $datalength$$ - 1) {
            throw Error("only " + $datalength$$ + " bytes available! programmer error!");
          }
          var $xhr$jscomp$inline_116$$ = new XMLHttpRequest();
          $xhr$jscomp$inline_116$$.open("GET", $url$jscomp$31$$, !1);
          $datalength$$ !== $chunkSize$$ && $xhr$jscomp$inline_116$$.setRequestHeader("Range", "bytes=" + $JSCompiler_inline_result$jscomp$15_start$jscomp$22$$ + "-" + $end$jscomp$21_to$jscomp$inline_115$$);
          $xhr$jscomp$inline_116$$.responseType = "arraybuffer";
          $xhr$jscomp$inline_116$$.overrideMimeType && $xhr$jscomp$inline_116$$.overrideMimeType("text/plain; charset=x-user-defined");
          $xhr$jscomp$inline_116$$.send(null);
          if (!(200 <= $xhr$jscomp$inline_116$$.status && 300 > $xhr$jscomp$inline_116$$.status || 304 === $xhr$jscomp$inline_116$$.status)) {
            throw Error("Couldn't load " + $url$jscomp$31$$ + ". Status: " + $xhr$jscomp$inline_116$$.status);
          }
          $JSCompiler_inline_result$jscomp$15_start$jscomp$22$$ = void 0 !== $xhr$jscomp$inline_116$$.response ? new Uint8Array($xhr$jscomp$inline_116$$.response || []) : $intArrayFromString$$($xhr$jscomp$inline_116$$.responseText || "");
          $JSCompiler_temp_const$jscomp$14$$[$chunkNum$jscomp$1$$] = $JSCompiler_inline_result$jscomp$15_start$jscomp$22$$;
        }
        if ("undefined" == typeof $lazyArray$jscomp$1$$.$j$[$chunkNum$jscomp$1$$]) {
          throw Error("doXHR failed!");
        }
        return $lazyArray$jscomp$1$$.$j$[$chunkNum$jscomp$1$$];
      });
      if ($usesGzip_xhr$jscomp$2$$ || !$datalength$$) {
        $chunkSize$$ = $datalength$$ = 1, $chunkSize$$ = $datalength$$ = this.$l$(0).length, $out$$("LazyFiles on gzip forces download of the whole file when length is accessed");
      }
      this.$s$ = $datalength$$;
      this.$o$ = $chunkSize$$;
      this.$m$ = !0;
    }
    get length() {
      this.$m$ || this.$u$();
      return this.$s$;
    }
    get chunkSize() {
      this.$m$ || this.$u$();
      return this.$o$;
    }
  }
  if ("undefined" != typeof XMLHttpRequest) {
    if (!$ENVIRONMENT_IS_WORKER$$) {
      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
    }
    var $JSCompiler_object_inline_contents_407$$ = new $LazyUint8Array$$();
    var $JSCompiler_object_inline_url_408$$ = void 0;
  } else {
    $JSCompiler_object_inline_url_408$$ = $url$jscomp$31$$, $JSCompiler_object_inline_contents_407$$ = void 0;
  }
  var $node$jscomp$47$$ = $FS$createFile$$($parent$jscomp$25$$, $name$jscomp$104$$, $canRead$jscomp$6$$, $canWrite$jscomp$6$$);
  $JSCompiler_object_inline_contents_407$$ ? $node$jscomp$47$$.$contents$ = $JSCompiler_object_inline_contents_407$$ : $JSCompiler_object_inline_url_408$$ && ($node$jscomp$47$$.$contents$ = null, $node$jscomp$47$$.url = $JSCompiler_object_inline_url_408$$);
  Object.defineProperties($node$jscomp$47$$, {$usedBytes$:{get:function() {
    return this.$contents$.length;
  }}});
  var $stream_ops$$ = {};
  Object.keys($node$jscomp$47$$.$stream_ops$).forEach($key$jscomp$42$$ => {
    var $fn$jscomp$1$$ = $node$jscomp$47$$.$stream_ops$[$key$jscomp$42$$];
    $stream_ops$$[$key$jscomp$42$$] = (...$args$jscomp$116$$) => {
      $FS$forceLoadFile$$($node$jscomp$47$$);
      return $fn$jscomp$1$$(...$args$jscomp$116$$);
    };
  });
  $stream_ops$$.read = ($stream$jscomp$49$$, $buffer$jscomp$39$$, $offset$jscomp$81$$, $length$jscomp$42$$, $position$jscomp$13$$) => {
    $FS$forceLoadFile$$($node$jscomp$47$$);
    return $writeChunks$$($stream$jscomp$49$$, $buffer$jscomp$39$$, $offset$jscomp$81$$, $length$jscomp$42$$, $position$jscomp$13$$);
  };
  $stream_ops$$.$mmap$ = ($stream$jscomp$50$$, $length$jscomp$43$$, $position$jscomp$14$$) => {
    $FS$forceLoadFile$$($node$jscomp$47$$);
    var $ptr$jscomp$8$$ = $mmapAlloc$$();
    if (!$ptr$jscomp$8$$) {
      throw new $FS$ErrnoError$$(48);
    }
    $writeChunks$$($stream$jscomp$50$$, $HEAP8$$, $ptr$jscomp$8$$, $length$jscomp$43$$, $position$jscomp$14$$);
    return {$ptr$:$ptr$jscomp$8$$, $allocated$:!0};
  };
  $node$jscomp$47$$.$stream_ops$ = $stream_ops$$;
  return $node$jscomp$47$$;
}
var $FS$$ = {};
function $SYSCALLS$calculateAt$$($dir$jscomp$5_dirfd$$, $path$jscomp$75$$, $allowEmpty$$) {
  if ("/" === $path$jscomp$75$$.charAt(0)) {
    return $path$jscomp$75$$;
  }
  $dir$jscomp$5_dirfd$$ = -100 === $dir$jscomp$5_dirfd$$ ? "/" : $FS$getStreamChecked$$($dir$jscomp$5_dirfd$$).path;
  if (0 == $path$jscomp$75$$.length) {
    if (!$allowEmpty$$) {
      throw new $FS$ErrnoError$$(44);
    }
    return $dir$jscomp$5_dirfd$$;
  }
  return $dir$jscomp$5_dirfd$$ + "/" + $path$jscomp$75$$;
}
function $SYSCALLS$writeStat$$($buf$jscomp$10$$, $stat$jscomp$1$$) {
  $HEAPU32$$[$buf$jscomp$10$$ >>> 2 >>> 0] = $stat$jscomp$1$$.dev;
  $HEAPU32$$[$buf$jscomp$10$$ + 4 >>> 2 >>> 0] = $stat$jscomp$1$$.mode;
  $HEAPU32$$[$buf$jscomp$10$$ + 8 >>> 2 >>> 0] = $stat$jscomp$1$$.nlink;
  $HEAPU32$$[$buf$jscomp$10$$ + 12 >>> 2 >>> 0] = $stat$jscomp$1$$.uid;
  $HEAPU32$$[$buf$jscomp$10$$ + 16 >>> 2 >>> 0] = $stat$jscomp$1$$.gid;
  $HEAPU32$$[$buf$jscomp$10$$ + 20 >>> 2 >>> 0] = $stat$jscomp$1$$.rdev;
  $HEAP64$$[$buf$jscomp$10$$ + 24 >>> 3 >>> 0] = BigInt($stat$jscomp$1$$.size);
  $HEAP32$$[$buf$jscomp$10$$ + 32 >>> 2 >>> 0] = 4096;
  $HEAP32$$[$buf$jscomp$10$$ + 36 >>> 2 >>> 0] = $stat$jscomp$1$$.blocks;
  var $atime$jscomp$5$$ = $stat$jscomp$1$$.atime.getTime(), $mtime$jscomp$5$$ = $stat$jscomp$1$$.mtime.getTime(), $ctime$$ = $stat$jscomp$1$$.ctime.getTime();
  $HEAP64$$[$buf$jscomp$10$$ + 40 >>> 3 >>> 0] = BigInt(Math.floor($atime$jscomp$5$$ / 1e3));
  $HEAPU32$$[$buf$jscomp$10$$ + 48 >>> 2 >>> 0] = $atime$jscomp$5$$ % 1e3 * 1E6;
  $HEAP64$$[$buf$jscomp$10$$ + 56 >>> 3 >>> 0] = BigInt(Math.floor($mtime$jscomp$5$$ / 1e3));
  $HEAPU32$$[$buf$jscomp$10$$ + 64 >>> 2 >>> 0] = $mtime$jscomp$5$$ % 1e3 * 1E6;
  $HEAP64$$[$buf$jscomp$10$$ + 72 >>> 3 >>> 0] = BigInt(Math.floor($ctime$$ / 1e3));
  $HEAPU32$$[$buf$jscomp$10$$ + 80 >>> 2 >>> 0] = $ctime$$ % 1e3 * 1E6;
  $HEAP64$$[$buf$jscomp$10$$ + 88 >>> 3 >>> 0] = BigInt($stat$jscomp$1$$.ino);
  return 0;
}
var $SYSCALLS$varargs$$ = void 0, $stringToUTF8$$ = ($str$jscomp$13$$, $outPtr$$, $maxBytesToWrite$jscomp$1$$) => {
  $assert$$("number" == typeof $maxBytesToWrite$jscomp$1$$, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return $stringToUTF8Array$$($str$jscomp$13$$, $HEAPU8$$, $outPtr$$, $maxBytesToWrite$jscomp$1$$);
}, $MONTH_DAYS_LEAP_CUMULATIVE$$ = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], $MONTH_DAYS_REGULAR_CUMULATIVE$$ = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], $readEmAsmArgsArray$$ = [], $runMainThreadEmAsm$$ = ($emAsmAddr$$, $sigPtr$jscomp$1_sigPtr$jscomp$inline_118$$, $argbuf_buf$jscomp$inline_119$$) => {
  $assert$$(Array.isArray($readEmAsmArgsArray$$));
  $assert$$(0 == $argbuf_buf$jscomp$inline_119$$ % 16);
  $readEmAsmArgsArray$$.length = 0;
  for (var $ch$jscomp$inline_120$$; $ch$jscomp$inline_120$$ = $HEAPU8$$[$sigPtr$jscomp$1_sigPtr$jscomp$inline_118$$++ >>> 0];) {
    var $chr$jscomp$inline_121_wide$jscomp$inline_123$$ = String.fromCharCode($ch$jscomp$inline_120$$), $validChars$jscomp$inline_122$$ = ["d", "f", "i", "p"];
    $validChars$jscomp$inline_122$$.push("j");
    $assert$$($validChars$jscomp$inline_122$$.includes($chr$jscomp$inline_121_wide$jscomp$inline_123$$), `Invalid character ${$ch$jscomp$inline_120$$}("${$chr$jscomp$inline_121_wide$jscomp$inline_123$$}") in readEmAsmArgs! Use only [${$validChars$jscomp$inline_122$$}], and do not specify "v" for void return argument.`);
    $chr$jscomp$inline_121_wide$jscomp$inline_123$$ = 105 != $ch$jscomp$inline_120$$;
    $chr$jscomp$inline_121_wide$jscomp$inline_123$$ &= 112 != $ch$jscomp$inline_120$$;
    $argbuf_buf$jscomp$inline_119$$ += $chr$jscomp$inline_121_wide$jscomp$inline_123$$ && $argbuf_buf$jscomp$inline_119$$ % 8 ? 4 : 0;
    $readEmAsmArgsArray$$.push(112 == $ch$jscomp$inline_120$$ ? $HEAPU32$$[$argbuf_buf$jscomp$inline_119$$ >>> 2 >>> 0] : 106 == $ch$jscomp$inline_120$$ ? $HEAP64$$[$argbuf_buf$jscomp$inline_119$$ >>> 3 >>> 0] : 105 == $ch$jscomp$inline_120$$ ? $HEAP32$$[$argbuf_buf$jscomp$inline_119$$ >>> 2 >>> 0] : $HEAPF64$$[$argbuf_buf$jscomp$inline_119$$ >>> 3 >>> 0]);
    $argbuf_buf$jscomp$inline_119$$ += $chr$jscomp$inline_121_wide$jscomp$inline_123$$ ? 8 : 4;
  }
  $assert$$($ASM_CONSTS$$.hasOwnProperty($emAsmAddr$$), `No EM_ASM constant found at address ${$emAsmAddr$$}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
  return $ASM_CONSTS$$[$emAsmAddr$$](...$readEmAsmArgsArray$$);
}, $_emscripten_set_main_loop_timing$$ = ($mode$jscomp$53$$, $value$jscomp$111$$) => {
  $MainLoop$timingMode$$ = $mode$jscomp$53$$;
  $MainLoop$timingValue$$ = $value$jscomp$111$$;
  if (!$MainLoop$func$$) {
    return $err$$("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up."), 1;
  }
  $MainLoop$running$$ ||= !0;
  if (0 == $mode$jscomp$53$$) {
    $MainLoop$scheduler$$ = function() {
      setTimeout($MainLoop$runner$$, Math.max(0, $MainLoop$tickStartTime$$ + $value$jscomp$111$$ - performance.now()) | 0);
    }, $MainLoop$method$$ = "timeout";
  } else if (1 == $mode$jscomp$53$$) {
    $MainLoop$scheduler$$ = function() {
      $MainLoop$requestAnimationFrame$$($MainLoop$runner$$);
    }, $MainLoop$method$$ = "rAF";
  } else if (2 == $mode$jscomp$53$$) {
    if ("undefined" == typeof $MainLoop$setImmediate$$) {
      if ("undefined" == typeof setImmediate) {
        var $setImmediates$$ = [];
        addEventListener("message", $event$jscomp$16$$ => {
          if ("setimmediate" === $event$jscomp$16$$.data || "setimmediate" === $event$jscomp$16$$.data.target) {
            $event$jscomp$16$$.stopPropagation(), $setImmediates$$.shift()();
          }
        }, !0);
        $MainLoop$setImmediate$$ = $func$jscomp$9$$ => {
          $setImmediates$$.push($func$jscomp$9$$);
          if ($ENVIRONMENT_IS_WORKER$$) {
            let $$jscomp$logical$assign$tmpm154824699$5$$;
            ($$jscomp$logical$assign$tmpm154824699$5$$ = $Module$$).setImmediates ?? ($$jscomp$logical$assign$tmpm154824699$5$$.setImmediates = []);
            $Module$$.setImmediates.push($func$jscomp$9$$);
            postMessage({target:"setimmediate"});
          } else {
            postMessage("setimmediate", "*");
          }
        };
      } else {
        $MainLoop$setImmediate$$ = setImmediate;
      }
    }
    $MainLoop$scheduler$$ = function() {
      $MainLoop$setImmediate$$($MainLoop$runner$$);
    };
    $MainLoop$method$$ = "immediate";
  }
  return 0;
}, $runtimeKeepaliveCounter$$ = 0, $exitJS$$ = ($status$jscomp$3$$, $implicit$$) => {
  $EXITSTATUS$$ = $status$jscomp$3$$;
  $checkUnflushedContent$$();
  ($noExitRuntime$$ || 0 < $runtimeKeepaliveCounter$$) && !$implicit$$ && $err$$(`program exited (with status: ${$status$jscomp$3$$}), but keepRuntimeAlive() is set (counter=${$runtimeKeepaliveCounter$$}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`);
  $EXITSTATUS$$ = $status$jscomp$3$$;
  $noExitRuntime$$ || 0 < $runtimeKeepaliveCounter$$ || ($Module$$.onExit?.($status$jscomp$3$$), $ABORT$$ = !0);
  $quit_$$($status$jscomp$3$$, new $ExitStatus$$($status$jscomp$3$$));
}, $handleException$$ = $e$jscomp$37$$ => {
  $e$jscomp$37$$ instanceof $ExitStatus$$ || "unwind" == $e$jscomp$37$$ || ($checkStackCookie$$(), $e$jscomp$37$$ instanceof WebAssembly.RuntimeError && 0 >= $_emscripten_stack_get_current$$() && $err$$("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), $quit_$$(1, $e$jscomp$37$$));
}, $maybeExit$$ = () => {
  if (!($noExitRuntime$$ || 0 < $runtimeKeepaliveCounter$$)) {
    try {
      $exitJS$$($EXITSTATUS$$);
    } catch ($e$jscomp$38$$) {
      $handleException$$($e$jscomp$38$$);
    }
  }
}, $setMainLoop$$ = ($iterFunc$$, $fps$$, $simulateInfiniteLoop$$, $arg$jscomp$12$$, $noSetTiming$$) => {
  function $checkIsRunning$$() {
    return $thisMainLoopId$$ < $MainLoop$currentlyRunningMainloop$$ ? ($maybeExit$$(), !1) : !0;
  }
  $assert$$(!$MainLoop$func$$, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  $MainLoop$func$$ = $iterFunc$$;
  $MainLoop$arg$$ = $arg$jscomp$12$$;
  var $thisMainLoopId$$ = $MainLoop$currentlyRunningMainloop$$;
  $MainLoop$running$$ = !1;
  $MainLoop$runner$$ = function() {
    if (!$ABORT$$) {
      if (0 < $MainLoop$queue$$.length) {
        var $blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$ = $MainLoop$queue$$.shift();
        $blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$.$func$($blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$.$arg$);
        if ($MainLoop$remainingBlockers$$) {
          var $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ = $MainLoop$remainingBlockers$$, $expected$jscomp$inline_129_next$jscomp$1$$ = 0 == $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ % 1 ? $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ - 1 : Math.floor($post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$);
          $MainLoop$remainingBlockers$$ = $blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$.$counted$ ? $expected$jscomp$inline_129_next$jscomp$1$$ : (8 * $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ + ($expected$jscomp$inline_129_next$jscomp$1$$ + .5)) / 9;
        }
        $Module$$.setStatus && ($blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$ = $Module$$.statusMessage || "Please wait...", $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ = $MainLoop$remainingBlockers$$ ?? 0, $expected$jscomp$inline_129_next$jscomp$1$$ = $MainLoop$$.$expectedBlockers$ ?? 0, $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ ? $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ < $expected$jscomp$inline_129_next$jscomp$1$$ ? 
        $Module$$.setStatus("{message} ({expected - remaining}/{expected})") : $Module$$.setStatus($blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$) : $Module$$.setStatus(""));
        $checkIsRunning$$() && setTimeout($MainLoop$runner$$, 0);
      } else {
        if ($checkIsRunning$$()) {
          if ($MainLoop$currentFrameNumber$$ = $MainLoop$currentFrameNumber$$ + 1 | 0, 1 == $MainLoop$timingMode$$ && 1 < $MainLoop$timingValue$$ && 0 != $MainLoop$currentFrameNumber$$ % $MainLoop$timingValue$$) {
            $MainLoop$scheduler$$();
          } else {
            0 == $MainLoop$timingMode$$ && ($MainLoop$tickStartTime$$ = performance.now());
            "timeout" === $MainLoop$method$$ && $Module$$.ctx && ($warnOnce$$("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), $MainLoop$method$$ = "");
            a: {
              if (!$ABORT$$) {
                for ($blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$ of $MainLoop$preMainLoop$$) {
                  if (!1 === $blocker_message$jscomp$inline_127_pre$jscomp$inline_132$$()) {
                    break a;
                  }
                }
                $callUserCallback$$($iterFunc$$);
                for ($post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$ of $MainLoop$postMainLoop$$) {
                  $post$jscomp$inline_133_remaining_remaining$jscomp$inline_128$$();
                }
                $checkStackCookie$$();
              }
            }
            $checkIsRunning$$() && $MainLoop$scheduler$$();
          }
        }
      }
    }
  };
  $noSetTiming$$ || (0 < $fps$$ ? $_emscripten_set_main_loop_timing$$(0, 1e3 / $fps$$) : $_emscripten_set_main_loop_timing$$(1, 1), $MainLoop$scheduler$$());
  if ($simulateInfiniteLoop$$) {
    throw "unwind";
  }
}, $callUserCallback$$ = $func$jscomp$10$$ => {
  if ($ABORT$$) {
    $err$$("user callback triggered after runtime exited or application aborted.  Ignoring.");
  } else {
    try {
      $func$jscomp$10$$(), $maybeExit$$();
    } catch ($e$jscomp$39$$) {
      $handleException$$($e$jscomp$39$$);
    }
  }
}, $MainLoop$running$$ = !1, $MainLoop$scheduler$$ = null, $MainLoop$method$$ = "", $MainLoop$currentlyRunningMainloop$$ = 0, $MainLoop$func$$ = null, $MainLoop$arg$$ = 0, $MainLoop$timingMode$$ = 0, $MainLoop$timingValue$$ = 0, $MainLoop$currentFrameNumber$$ = 0, $MainLoop$queue$$ = [], $MainLoop$preMainLoop$$ = [], $MainLoop$postMainLoop$$ = [];
function $MainLoop$pause$$() {
  $MainLoop$scheduler$$ = null;
  $MainLoop$currentlyRunningMainloop$$++;
}
function $MainLoop$resume$$() {
  $MainLoop$currentlyRunningMainloop$$++;
  var $timingMode$$ = $MainLoop$timingMode$$, $timingValue$$ = $MainLoop$timingValue$$, $func$jscomp$11$$ = $MainLoop$func$$;
  $MainLoop$func$$ = null;
  $setMainLoop$$($func$jscomp$11$$, 0, !1, $MainLoop$arg$$, !0);
  $_emscripten_set_main_loop_timing$$($timingMode$$, $timingValue$$);
  $MainLoop$scheduler$$();
}
var $MainLoop$nextRAF$$ = 0;
function $MainLoop$requestAnimationFrame$$($func$jscomp$14$$) {
  if ("function" == typeof requestAnimationFrame) {
    requestAnimationFrame($func$jscomp$14$$);
  } else {
    var $now$jscomp$inline_136$$ = Date.now();
    if (0 === $MainLoop$nextRAF$$) {
      $MainLoop$nextRAF$$ = $now$jscomp$inline_136$$ + 1e3 / 60;
    } else {
      for (; $now$jscomp$inline_136$$ + 2 >= $MainLoop$nextRAF$$;) {
        $MainLoop$nextRAF$$ += 1e3 / 60;
      }
    }
    setTimeout($func$jscomp$14$$, Math.max($MainLoop$nextRAF$$ - $now$jscomp$inline_136$$, 0));
  }
}
var $MainLoop$$ = {}, $MainLoop$tickStartTime$$, $MainLoop$runner$$, $MainLoop$setImmediate$$, $MainLoop$remainingBlockers$$;
function $JSCompiler_StaticMethods__removeHandler$$($i$jscomp$24$$) {
  var $h$jscomp$9$$ = $JSEvents$$.$eventHandlers$[$i$jscomp$24$$];
  $h$jscomp$9$$.target.removeEventListener($h$jscomp$9$$.$eventTypeString$, $h$jscomp$9$$.$eventListenerFunc$, $h$jscomp$9$$.$useCapture$);
  $JSEvents$$.$eventHandlers$.splice($i$jscomp$24$$, 1);
}
function $JSCompiler_StaticMethods_deferCall$$($targetFunction$$, $precedence$$, $argsList$$) {
  function $arraysHaveEqualContent$$($arrA$$, $arrB$$) {
    if ($arrA$$.length != $arrB$$.length) {
      return !1;
    }
    for (var $i$jscomp$22$$ in $arrA$$) {
      if ($arrA$$[$i$jscomp$22$$] != $arrB$$[$i$jscomp$22$$]) {
        return !1;
      }
    }
    return !0;
  }
  for (var $call$$ of $JSEvents$$.$deferredCalls$) {
    if ($call$$.$targetFunction$ == $targetFunction$$ && $arraysHaveEqualContent$$($call$$.$argsList$, $argsList$$)) {
      return;
    }
  }
  $JSEvents$$.$deferredCalls$.push({$targetFunction$:$targetFunction$$, $precedence$:$precedence$$, $argsList$:$argsList$$});
  $JSEvents$$.$deferredCalls$.sort(($x$jscomp$92$$, $y$jscomp$77$$) => $x$jscomp$92$$.$precedence$ < $y$jscomp$77$$.$precedence$);
}
function $JSCompiler_StaticMethods_removeDeferredCalls$$($targetFunction$jscomp$1$$) {
  $JSEvents$$.$deferredCalls$ = $JSEvents$$.$deferredCalls$.filter($call$jscomp$1$$ => $call$jscomp$1$$.$targetFunction$ != $targetFunction$jscomp$1$$);
}
function $JSCompiler_StaticMethods_canPerformEventHandlerRequests$$() {
  return navigator.userActivation ? navigator.userActivation.isActive : $JSEvents$$.$inEventHandler$ && $JSEvents$$.$currentEventHandler$.$allowsDeferredCalls$;
}
function $JSCompiler_StaticMethods_runDeferredCalls$$() {
  if ($JSCompiler_StaticMethods_canPerformEventHandlerRequests$$()) {
    var $deferredCalls$$ = $JSEvents$$.$deferredCalls$;
    $JSEvents$$.$deferredCalls$ = [];
    for (var $call$jscomp$2$$ of $deferredCalls$$) {
      $call$jscomp$2$$.$targetFunction$(...$call$jscomp$2$$.$argsList$);
    }
  }
}
function $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$$) {
  if (!$eventHandler$$.target) {
    return $err$$("registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:"), console.dir($eventHandler$$), -4;
  }
  if ($eventHandler$$.$callbackfunc$) {
    $eventHandler$$.$eventListenerFunc$ = function($event$jscomp$17$$) {
      ++$JSEvents$$.$inEventHandler$;
      $JSEvents$$.$currentEventHandler$ = $eventHandler$$;
      $JSCompiler_StaticMethods_runDeferredCalls$$();
      $eventHandler$$.$handlerFunc$($event$jscomp$17$$);
      $JSCompiler_StaticMethods_runDeferredCalls$$();
      --$JSEvents$$.$inEventHandler$;
    }, $eventHandler$$.target.addEventListener($eventHandler$$.$eventTypeString$, $eventHandler$$.$eventListenerFunc$, $eventHandler$$.$useCapture$), $JSEvents$$.$eventHandlers$.push($eventHandler$$);
  } else {
    for (var $i$jscomp$25$$ = 0; $i$jscomp$25$$ < $JSEvents$$.$eventHandlers$.length; ++$i$jscomp$25$$) {
      $JSEvents$$.$eventHandlers$[$i$jscomp$25$$].target == $eventHandler$$.target && $JSEvents$$.$eventHandlers$[$i$jscomp$25$$].$eventTypeString$ == $eventHandler$$.$eventTypeString$ && $JSCompiler_StaticMethods__removeHandler$$($i$jscomp$25$$--);
    }
  }
  return 0;
}
function $JSCompiler_StaticMethods_getNodeNameForTarget$$($target$jscomp$94$$) {
  return $target$jscomp$94$$ ? $target$jscomp$94$$ == window ? "#window" : $target$jscomp$94$$ == screen ? "#screen" : $target$jscomp$94$$?.nodeName || "" : "";
}
var $JSEvents$$ = {$batteryEvent$:0, $gamepadEvent$:0, $keyEvent$:0, $mouseEvent$:0, $wheelEvent$:0, $uiEvent$:0, $focusEvent$:0, $deviceOrientationEvent$:0, $orientationChangeEvent$:0, $deviceMotionEvent$:0, $fullscreenChangeEvent$:0, $pointerlockChangeEvent$:0, $visibilityChangeEvent$:0, $touchEvent$:0, $memcpy$($target$jscomp$92$$, $src$jscomp$4$$, $size$jscomp$27$$) {
  $HEAP8$$.set($HEAP8$$.subarray($src$jscomp$4$$ >>> 0, $src$jscomp$4$$ + $size$jscomp$27$$ >>> 0), $target$jscomp$92$$ >>> 0);
}, $removeAllEventListeners$() {
  for (; $JSEvents$$.$eventHandlers$.length;) {
    $JSCompiler_StaticMethods__removeHandler$$($JSEvents$$.$eventHandlers$.length - 1);
  }
  $JSEvents$$.$deferredCalls$ = [];
}, $inEventHandler$:0, $deferredCalls$:[], $eventHandlers$:[], $removeAllHandlersOnTarget$:($target$jscomp$93$$, $eventTypeString$$) => {
  for (var $i$jscomp$23$$ = 0; $i$jscomp$23$$ < $JSEvents$$.$eventHandlers$.length; ++$i$jscomp$23$$) {
    $JSEvents$$.$eventHandlers$[$i$jscomp$23$$].target != $target$jscomp$93$$ || $eventTypeString$$ && $eventTypeString$$ != $JSEvents$$.$eventHandlers$[$i$jscomp$23$$].$eventTypeString$ || $JSCompiler_StaticMethods__removeHandler$$($i$jscomp$23$$--);
  }
}, fullscreenEnabled() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled;
}}, $specialHTMLTargets$$ = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0], $findEventTarget$$ = $cString$jscomp$inline_138_target$jscomp$95$$ => {
  $cString$jscomp$inline_138_target$jscomp$95$$ = 2 < $cString$jscomp$inline_138_target$jscomp$95$$ ? $UTF8ToString$$($cString$jscomp$inline_138_target$jscomp$95$$) : $cString$jscomp$inline_138_target$jscomp$95$$;
  return $specialHTMLTargets$$[$cString$jscomp$inline_138_target$jscomp$95$$] || ("undefined" != typeof document ? document.querySelector($cString$jscomp$inline_138_target$jscomp$95$$) : null);
}, $stringToUTF8OnStack$$ = $str$jscomp$14$$ => {
  var $size$jscomp$28$$ = $lengthBytesUTF8$$($str$jscomp$14$$) + 1, $ret$jscomp$7$$ = $__emscripten_stack_alloc$$($size$jscomp$28$$);
  $stringToUTF8$$($str$jscomp$14$$, $ret$jscomp$7$$, $size$jscomp$28$$);
  return $ret$jscomp$7$$;
}, $getCanvasElementSize$$ = $target$jscomp$97_width$jscomp$inline_141$$ => {
  var $sp$$ = $_emscripten_stack_get_current$$(), $size$jscomp$29_w$jscomp$14$$ = $__emscripten_stack_alloc$$(8), $h$jscomp$10$$ = $size$jscomp$29_w$jscomp$14$$ + 4;
  var $canvas$jscomp$inline_143_target$jscomp$inline_140$$ = $stringToUTF8OnStack$$($target$jscomp$97_width$jscomp$inline_141$$.id);
  $target$jscomp$97_width$jscomp$inline_141$$ = $size$jscomp$29_w$jscomp$14$$ >>> 0;
  var $height$jscomp$inline_142$$ = $h$jscomp$10$$ >>> 0;
  if ($canvas$jscomp$inline_143_target$jscomp$inline_140$$ = $findEventTarget$$($canvas$jscomp$inline_143_target$jscomp$inline_140$$ >>> 0)) {
    $HEAP32$$[$target$jscomp$97_width$jscomp$inline_141$$ >>> 2 >>> 0] = $canvas$jscomp$inline_143_target$jscomp$inline_140$$.width, $HEAP32$$[$height$jscomp$inline_142$$ >>> 2 >>> 0] = $canvas$jscomp$inline_143_target$jscomp$inline_140$$.height;
  }
  $size$jscomp$29_w$jscomp$14$$ = [$HEAP32$$[$size$jscomp$29_w$jscomp$14$$ >>> 2 >>> 0], $HEAP32$$[$h$jscomp$10$$ >>> 2 >>> 0]];
  $__emscripten_stack_restore$$($sp$$);
  return $size$jscomp$29_w$jscomp$14$$;
};
function $_emscripten_set_canvas_element_size$$($canvas$jscomp$1_target$jscomp$98$$, $width$jscomp$29$$, $height$jscomp$26$$) {
  $canvas$jscomp$1_target$jscomp$98$$ = $findEventTarget$$($canvas$jscomp$1_target$jscomp$98$$ >>> 0);
  if (!$canvas$jscomp$1_target$jscomp$98$$) {
    return -4;
  }
  $canvas$jscomp$1_target$jscomp$98$$.width = $width$jscomp$29$$;
  $canvas$jscomp$1_target$jscomp$98$$.height = $height$jscomp$26$$;
  return 0;
}
var $setCanvasElementSize$$ = ($target$jscomp$99_targetInt$jscomp$1$$, $width$jscomp$30$$, $height$jscomp$27$$) => {
  if ($target$jscomp$99_targetInt$jscomp$1$$.$controlTransferredOffscreen$) {
    var $sp$jscomp$1$$ = $_emscripten_stack_get_current$$();
    $target$jscomp$99_targetInt$jscomp$1$$ = $stringToUTF8OnStack$$($target$jscomp$99_targetInt$jscomp$1$$.id);
    $_emscripten_set_canvas_element_size$$($target$jscomp$99_targetInt$jscomp$1$$, $width$jscomp$30$$, $height$jscomp$27$$);
    $__emscripten_stack_restore$$($sp$jscomp$1$$);
  } else {
    $target$jscomp$99_targetInt$jscomp$1$$.width = $width$jscomp$30$$, $target$jscomp$99_targetInt$jscomp$1$$.height = $height$jscomp$27$$;
  }
}, $currentFullscreenStrategy$$ = {}, $registerRestoreOldStyle$$ = $canvas$jscomp$2$$ => {
  function $restoreOldStyle$$() {
    $getFullscreenElement$$() || (document.removeEventListener("fullscreenchange", $restoreOldStyle$$), document.removeEventListener("webkitfullscreenchange", $restoreOldStyle$$), $setCanvasElementSize$$($canvas$jscomp$2$$, $oldWidth$$, $oldHeight$$), $canvas$jscomp$2$$.style.width = $oldCssWidth$$, $canvas$jscomp$2$$.style.height = $oldCssHeight$$, $canvas$jscomp$2$$.style.backgroundColor = $oldBackgroundColor$$, $oldDocumentBackgroundColor$$ || (document.body.style.backgroundColor = "white"), document.body.style.backgroundColor = 
    $oldDocumentBackgroundColor$$, $canvas$jscomp$2$$.style.paddingLeft = $oldPaddingLeft$$, $canvas$jscomp$2$$.style.paddingRight = $oldPaddingRight$$, $canvas$jscomp$2$$.style.paddingTop = $oldPaddingTop$$, $canvas$jscomp$2$$.style.paddingBottom = $oldPaddingBottom$$, $canvas$jscomp$2$$.style.marginLeft = $oldMarginLeft$$, $canvas$jscomp$2$$.style.marginRight = $oldMarginRight$$, $canvas$jscomp$2$$.style.marginTop = $oldMarginTop$$, $canvas$jscomp$2$$.style.marginBottom = $oldMarginBottom$$, document.body.style.margin = 
    $oldDocumentBodyMargin$$, document.documentElement.style.overflow = $oldDocumentOverflow$$, document.body.scroll = $oldDocumentScroll$$, $canvas$jscomp$2$$.style.$imageRendering$ = $oldImageRendering$$, $canvas$jscomp$2$$.$GLctxObject$ && $canvas$jscomp$2$$.$GLctxObject$.$GLctx$.viewport(0, 0, $oldWidth$$, $oldHeight$$), $currentFullscreenStrategy$$.$canvasResizedCallback$ && $dynCall_iiii$$($currentFullscreenStrategy$$.$canvasResizedCallback$, 37, 0, $currentFullscreenStrategy$$.$canvasResizedCallbackUserData$));
  }
  var $canvasSize$$ = $getCanvasElementSize$$($canvas$jscomp$2$$), $oldWidth$$ = $canvasSize$$[0], $oldHeight$$ = $canvasSize$$[1], $oldCssWidth$$ = $canvas$jscomp$2$$.style.width, $oldCssHeight$$ = $canvas$jscomp$2$$.style.height, $oldBackgroundColor$$ = $canvas$jscomp$2$$.style.backgroundColor, $oldDocumentBackgroundColor$$ = document.body.style.backgroundColor, $oldPaddingLeft$$ = $canvas$jscomp$2$$.style.paddingLeft, $oldPaddingRight$$ = $canvas$jscomp$2$$.style.paddingRight, $oldPaddingTop$$ = 
  $canvas$jscomp$2$$.style.paddingTop, $oldPaddingBottom$$ = $canvas$jscomp$2$$.style.paddingBottom, $oldMarginLeft$$ = $canvas$jscomp$2$$.style.marginLeft, $oldMarginRight$$ = $canvas$jscomp$2$$.style.marginRight, $oldMarginTop$$ = $canvas$jscomp$2$$.style.marginTop, $oldMarginBottom$$ = $canvas$jscomp$2$$.style.marginBottom, $oldDocumentBodyMargin$$ = document.body.style.margin, $oldDocumentOverflow$$ = document.documentElement.style.overflow, $oldDocumentScroll$$ = document.body.scroll, $oldImageRendering$$ = 
  $canvas$jscomp$2$$.style.$imageRendering$;
  document.addEventListener("fullscreenchange", $restoreOldStyle$$);
  document.addEventListener("webkitfullscreenchange", $restoreOldStyle$$);
}, $setLetterbox$$ = ($element$jscomp$8$$, $topBottom$$, $leftRight$$) => {
  $element$jscomp$8$$.style.paddingLeft = $element$jscomp$8$$.style.paddingRight = $leftRight$$ + "px";
  $element$jscomp$8$$.style.paddingTop = $element$jscomp$8$$.style.paddingBottom = $topBottom$$ + "px";
}, $getBoundingClientRect$$ = $e$jscomp$40$$ => 0 > $specialHTMLTargets$$.indexOf($e$jscomp$40$$) ? $e$jscomp$40$$.getBoundingClientRect() : {left:0, top:0}, $JSEvents_requestFullscreen$$ = ($target$jscomp$101$$, $strategy$jscomp$1$$) => {
  if (0 != $strategy$jscomp$1$$.$scaleMode$ || 0 != $strategy$jscomp$1$$.$canvasResolutionScaleMode$) {
    $registerRestoreOldStyle$$($target$jscomp$101$$);
    var $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ = $strategy$jscomp$1$$.$softFullscreen$ ? innerWidth : screen.width, $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ = $strategy$jscomp$1$$.$softFullscreen$ ? innerHeight : screen.height, $rect$jscomp$inline_451_windowedCssHeight$jscomp$inline_453$$ = $getBoundingClientRect$$($target$jscomp$101$$), $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$ = $rect$jscomp$inline_451_windowedCssHeight$jscomp$inline_453$$.width;
    $rect$jscomp$inline_451_windowedCssHeight$jscomp$inline_453$$ = $rect$jscomp$inline_451_windowedCssHeight$jscomp$inline_453$$.height;
    var $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$ = $getCanvasElementSize$$($target$jscomp$101$$), $windowedRttWidth$jscomp$inline_455$$ = $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$[0];
    $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$ = $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$[1];
    3 == $strategy$jscomp$1$$.$scaleMode$ ? ($setLetterbox$$($target$jscomp$101$$, ($cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ - $rect$jscomp$inline_451_windowedCssHeight$jscomp$inline_453$$) / 2, ($cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ - $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$) / 2), $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ = $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$, 
    $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ = $rect$jscomp$inline_451_windowedCssHeight$jscomp$inline_453$$) : 2 == $strategy$jscomp$1$$.$scaleMode$ && ($cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ * $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$ < $windowedRttWidth$jscomp$inline_455$$ * $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ ? ($desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$ = 
    $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$ * $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ / $windowedRttWidth$jscomp$inline_455$$, $setLetterbox$$($target$jscomp$101$$, ($cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ - $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$) / 2, 0), $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ = $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$) : 
    ($desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$ = $windowedRttWidth$jscomp$inline_455$$ * $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ / $canvasSize$jscomp$inline_454_windowedRttHeight$jscomp$inline_456$$, $setLetterbox$$($target$jscomp$101$$, 0, ($cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ - $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$) / 2), $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ = 
    $desiredCssHeight$jscomp$inline_457_desiredCssWidth$jscomp$inline_458_windowedCssWidth$jscomp$inline_452$$));
    var $$jscomp$inline_459_dpiScale$jscomp$inline_461$$;
    ($$jscomp$inline_459_dpiScale$jscomp$inline_461$$ = $target$jscomp$101$$.style).backgroundColor || ($$jscomp$inline_459_dpiScale$jscomp$inline_461$$.backgroundColor = "black");
    let $$jscomp$inline_460$$;
    ($$jscomp$inline_460$$ = document.body.style).backgroundColor || ($$jscomp$inline_460$$.backgroundColor = "black");
    $target$jscomp$101$$.style.width = $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ + "px";
    $target$jscomp$101$$.style.height = $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ + "px";
    1 == $strategy$jscomp$1$$.$filteringMode$ && ($target$jscomp$101$$.style.$imageRendering$ = "optimizeSpeed", $target$jscomp$101$$.style.$imageRendering$ = "-moz-crisp-edges", $target$jscomp$101$$.style.$imageRendering$ = "-o-crisp-edges", $target$jscomp$101$$.style.$imageRendering$ = "-webkit-optimize-contrast", $target$jscomp$101$$.style.$imageRendering$ = "optimize-contrast", $target$jscomp$101$$.style.$imageRendering$ = "crisp-edges", $target$jscomp$101$$.style.$imageRendering$ = "pixelated");
    $$jscomp$inline_459_dpiScale$jscomp$inline_461$$ = 2 == $strategy$jscomp$1$$.$canvasResolutionScaleMode$ ? devicePixelRatio : 1;
    0 != $strategy$jscomp$1$$.$canvasResolutionScaleMode$ && ($cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ = $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$ * $$jscomp$inline_459_dpiScale$jscomp$inline_461$$ | 0, $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ = $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$ * $$jscomp$inline_459_dpiScale$jscomp$inline_461$$ | 0, $setCanvasElementSize$$($target$jscomp$101$$, $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$, 
    $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$), $target$jscomp$101$$.$GLctxObject$ && $target$jscomp$101$$.$GLctxObject$.$GLctx$.viewport(0, 0, $cssWidth$jscomp$inline_449_newWidth$jscomp$inline_462$$, $cssHeight$jscomp$inline_450_newHeight$jscomp$inline_463$$));
  }
  if ($target$jscomp$101$$.requestFullscreen) {
    $target$jscomp$101$$.requestFullscreen();
  } else if ($target$jscomp$101$$.webkitRequestFullscreen) {
    $target$jscomp$101$$.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    return $JSEvents$$.fullscreenEnabled() ? -3 : -1;
  }
  $currentFullscreenStrategy$$ = $strategy$jscomp$1$$;
  $strategy$jscomp$1$$.$canvasResizedCallback$ && $dynCall_iiii$$($strategy$jscomp$1$$.$canvasResizedCallback$, 37, 0, $strategy$jscomp$1$$.$canvasResizedCallbackUserData$);
  return 0;
}, $requestPointerLock$$ = $target$jscomp$102$$ => {
  if ($target$jscomp$102$$.requestPointerLock) {
    $target$jscomp$102$$.requestPointerLock();
  } else {
    return document.body.requestPointerLock ? -3 : -1;
  }
  return 0;
}, $fillGamepadEventData$$ = ($eventStruct$$, $e$jscomp$41$$) => {
  $HEAPF64$$[$eventStruct$$ >>> 3 >>> 0] = $e$jscomp$41$$.timestamp;
  for (var $i$jscomp$26$$ = 0; $i$jscomp$26$$ < $e$jscomp$41$$.axes.length; ++$i$jscomp$26$$) {
    $HEAPF64$$[$eventStruct$$ + 8 * $i$jscomp$26$$ + 16 >>> 3 >>> 0] = $e$jscomp$41$$.axes[$i$jscomp$26$$];
  }
  for ($i$jscomp$26$$ = 0; $i$jscomp$26$$ < $e$jscomp$41$$.buttons.length; ++$i$jscomp$26$$) {
    $HEAPF64$$[$eventStruct$$ + 8 * $i$jscomp$26$$ + 528 >>> 3 >>> 0] = "object" == typeof $e$jscomp$41$$.buttons[$i$jscomp$26$$] ? $e$jscomp$41$$.buttons[$i$jscomp$26$$].value : $e$jscomp$41$$.buttons[$i$jscomp$26$$];
  }
  for ($i$jscomp$26$$ = 0; $i$jscomp$26$$ < $e$jscomp$41$$.buttons.length; ++$i$jscomp$26$$) {
    $HEAP8$$[$eventStruct$$ + $i$jscomp$26$$ + 1040 >>> 0] = "object" == typeof $e$jscomp$41$$.buttons[$i$jscomp$26$$] ? $e$jscomp$41$$.buttons[$i$jscomp$26$$].pressed : 1 == $e$jscomp$41$$.buttons[$i$jscomp$26$$];
  }
  $HEAP8$$[$eventStruct$$ + 1104 >>> 0] = $e$jscomp$41$$.connected;
  $HEAP32$$[$eventStruct$$ + 1108 >>> 2 >>> 0] = $e$jscomp$41$$.index;
  $HEAP32$$[$eventStruct$$ + 8 >>> 2 >>> 0] = $e$jscomp$41$$.axes.length;
  $HEAP32$$[$eventStruct$$ + 12 >>> 2 >>> 0] = $e$jscomp$41$$.buttons.length;
  $stringToUTF8$$($e$jscomp$41$$.id, $eventStruct$$ + 1112, 64);
  $stringToUTF8$$($e$jscomp$41$$.mapping, $eventStruct$$ + 1176, 64);
};
function $getFullscreenElement$$() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement;
}
var $safeSetTimeout$$ = ($func$jscomp$15$$, $timeout$jscomp$4$$) => setTimeout(() => {
  $callUserCallback$$($func$jscomp$15$$);
}, $timeout$jscomp$4$$), $Browser$isFullscreen$$ = !1, $Browser$pointerLock$$ = !1, $Browser$moduleContextCreatedCallbacks$$ = [];
function $Browser$init$$() {
  function $pointerLockChange$$() {
    $Browser$pointerLock$$ = document.pointerLockElement === $Module$$.canvas;
  }
  if (!$Browser$initted$$) {
    $Browser$initted$$ = !0;
    $preloadPlugins$$.push({canHandle:function($name$jscomp$107$$) {
      return !$Module$$.noImageDecoding && /\.(jpg|jpeg|png|bmp|webp)$/i.test($name$jscomp$107$$);
    }, handle:async function($byteArray$jscomp$2$$, $name$jscomp$108$$) {
      var $b$jscomp$2$$ = new Blob([$byteArray$jscomp$2$$], {type:$Browser$getMimetype$$($name$jscomp$108$$)});
      $b$jscomp$2$$.size !== $byteArray$jscomp$2$$.length && ($b$jscomp$2$$ = new Blob([(new Uint8Array($byteArray$jscomp$2$$)).buffer], {type:$Browser$getMimetype$$($name$jscomp$108$$)}));
      var $url$jscomp$32$$ = URL.createObjectURL($b$jscomp$2$$);
      return new Promise(($resolve$jscomp$2$$, $reject$jscomp$2$$) => {
        var $img$jscomp$2$$ = new Image();
        $img$jscomp$2$$.onload = () => {
          $assert$$($img$jscomp$2$$.complete, `Image ${$name$jscomp$108$$} could not be decoded`);
          var $canvas$jscomp$4$$ = document.createElement("canvas");
          $canvas$jscomp$4$$.width = $img$jscomp$2$$.width;
          $canvas$jscomp$4$$.height = $img$jscomp$2$$.height;
          $canvas$jscomp$4$$.getContext("2d").drawImage($img$jscomp$2$$, 0, 0);
          URL.revokeObjectURL($url$jscomp$32$$);
          $resolve$jscomp$2$$($byteArray$jscomp$2$$);
        };
        $img$jscomp$2$$.onerror = () => {
          $err$$(`Image ${$url$jscomp$32$$} could not be decoded`);
          $reject$jscomp$2$$();
        };
        $img$jscomp$2$$.src = $url$jscomp$32$$;
      });
    }});
    $preloadPlugins$$.push({canHandle:function($name$jscomp$109$$) {
      return !$Module$$.noAudioDecoding && $name$jscomp$109$$.slice(-4) in {".ogg":1, ".wav":1, ".mp3":1};
    }, handle:async function($byteArray$jscomp$3$$, $name$jscomp$110$$) {
      return new Promise($resolve$jscomp$3$$ => {
        function $finish$$() {
          $done$jscomp$1$$ || ($done$jscomp$1$$ = !0, $resolve$jscomp$3$$($byteArray$jscomp$3$$));
        }
        var $done$jscomp$1$$ = !1, $b$jscomp$3_url$jscomp$33$$ = new Blob([$byteArray$jscomp$3$$], {type:$Browser$getMimetype$$($name$jscomp$110$$)});
        $b$jscomp$3_url$jscomp$33$$ = URL.createObjectURL($b$jscomp$3_url$jscomp$33$$);
        var $audio$$ = new Audio();
        $audio$$.addEventListener("canplaythrough", () => $finish$$($audio$$), !1);
        $audio$$.onerror = function() {
          if (!$done$jscomp$1$$) {
            $err$$(`warning: browser could not fully decode audio ${$name$jscomp$110$$}, trying slower base64 approach`);
            for (var $JSCompiler_temp_const$jscomp$17$$ = "data:audio/x-" + $name$jscomp$110$$.slice(-3) + ";base64,", $ret$jscomp$inline_150$$ = "", $leftchar$jscomp$inline_151$$ = 0, $leftbits$jscomp$inline_152$$ = 0, $i$jscomp$inline_153$$ = 0; $i$jscomp$inline_153$$ < $byteArray$jscomp$3$$.length; $i$jscomp$inline_153$$++) {
              for ($leftchar$jscomp$inline_151$$ = $leftchar$jscomp$inline_151$$ << 8 | $byteArray$jscomp$3$$[$i$jscomp$inline_153$$], $leftbits$jscomp$inline_152$$ += 8; 6 <= $leftbits$jscomp$inline_152$$;) {
                var $curr$jscomp$inline_154$$ = $leftchar$jscomp$inline_151$$ >> $leftbits$jscomp$inline_152$$ - 6 & 63;
                $leftbits$jscomp$inline_152$$ -= 6;
                $ret$jscomp$inline_150$$ += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[$curr$jscomp$inline_154$$];
              }
            }
            2 == $leftbits$jscomp$inline_152$$ ? ($ret$jscomp$inline_150$$ += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[($leftchar$jscomp$inline_151$$ & 3) << 4], $ret$jscomp$inline_150$$ += "==") : 4 == $leftbits$jscomp$inline_152$$ && ($ret$jscomp$inline_150$$ += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[($leftchar$jscomp$inline_151$$ & 15) << 2], $ret$jscomp$inline_150$$ += "=");
            $audio$$.src = $JSCompiler_temp_const$jscomp$17$$ + $ret$jscomp$inline_150$$;
            $finish$$($audio$$);
          }
        };
        $audio$$.src = $b$jscomp$3_url$jscomp$33$$;
        $safeSetTimeout$$(() => {
          $finish$$($audio$$);
        }, 1e4);
      });
    }});
    var $canvas$jscomp$3$$ = $Module$$.canvas;
    $canvas$jscomp$3$$ && (document.addEventListener("pointerlockchange", $pointerLockChange$$, !1), $Module$$.elementPointerLock && $canvas$jscomp$3$$.addEventListener("click", $ev$$ => {
      !$Browser$pointerLock$$ && $Module$$.canvas.requestPointerLock && ($Module$$.canvas.requestPointerLock(), $ev$$.preventDefault());
    }, !1));
  }
}
function $Browser$createContext$$($canvas$jscomp$6$$, $useWebGL$$, $setInModule$$, $webGLContextAttributes$$) {
  if ($useWebGL$$ && $Module$$.ctx && $canvas$jscomp$6$$ == $Module$$.canvas) {
    return $Module$$.ctx;
  }
  var $contextHandle$$;
  if ($useWebGL$$) {
    var $contextAttributes$$ = {antialias:!1, alpha:!1, $majorVersion$:1};
    if ($webGLContextAttributes$$) {
      for (var $attribute$jscomp$1$$ in $webGLContextAttributes$$) {
        $contextAttributes$$[$attribute$jscomp$1$$] = $webGLContextAttributes$$[$attribute$jscomp$1$$];
      }
    }
    if ("undefined" != typeof $GL$$ && ($contextHandle$$ = $GL$createContext$$($canvas$jscomp$6$$, $contextAttributes$$))) {
      var $ctx$jscomp$1$$ = $GL$contexts$$[$contextHandle$$].$GLctx$;
    }
  } else {
    $ctx$jscomp$1$$ = $canvas$jscomp$6$$.getContext("2d");
  }
  if (!$ctx$jscomp$1$$) {
    return null;
  }
  $setInModule$$ && ($useWebGL$$ || $assert$$("undefined" == typeof $GLctx$$, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), $Module$$.ctx = $ctx$jscomp$1$$, $useWebGL$$ && $GL$makeContextCurrent$$($contextHandle$$), $Browser$moduleContextCreatedCallbacks$$.forEach($callback$jscomp$133$$ => $callback$jscomp$133$$()), $Browser$init$$());
  return $ctx$jscomp$1$$;
}
var $Browser$fullscreenHandlersInstalled$$ = !1, $Browser$lockPointer$$ = void 0, $Browser$resizeCanvas$$ = void 0;
function $Browser$exitFullscreen$$() {
  if (!$Browser$isFullscreen$$) {
    return !1;
  }
  (document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || (() => {
  })).apply(document, []);
  return !0;
}
function $Browser$getMimetype$$($name$jscomp$111$$) {
  return {jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", bmp:"image/bmp", ogg:"audio/ogg", wav:"audio/wav", mp3:"audio/mpeg"}[$name$jscomp$111$$.slice($name$jscomp$111$$.lastIndexOf(".") + 1)];
}
var $Browser$resizeListeners$$ = [];
function $Browser$updateResizeListeners$$() {
  var $canvas$jscomp$9$$ = $Module$$.canvas;
  $Browser$resizeListeners$$.forEach($listener$jscomp$81$$ => $listener$jscomp$81$$($canvas$jscomp$9$$.width, $canvas$jscomp$9$$.height));
}
function $Browser$updateCanvasDimensions$$($canvas$jscomp$11$$) {
  if ($wNative$$ && $hNative$$) {
    $canvas$jscomp$11$$.$widthNative$ = $wNative$$, $canvas$jscomp$11$$.$heightNative$ = $hNative$$;
  } else {
    var $wNative$$ = $canvas$jscomp$11$$.$widthNative$;
    var $hNative$$ = $canvas$jscomp$11$$.$heightNative$;
  }
  var $w$jscomp$15$$ = $wNative$$, $h$jscomp$11$$ = $hNative$$;
  0 < $Module$$.forcedAspectRatio && ($w$jscomp$15$$ / $h$jscomp$11$$ < $Module$$.forcedAspectRatio ? $w$jscomp$15$$ = Math.round($h$jscomp$11$$ * $Module$$.forcedAspectRatio) : $h$jscomp$11$$ = Math.round($w$jscomp$15$$ / $Module$$.forcedAspectRatio));
  if ($getFullscreenElement$$() === $canvas$jscomp$11$$.parentNode && "undefined" != typeof screen) {
    var $factor$jscomp$1$$ = Math.min(screen.width / $w$jscomp$15$$, screen.height / $h$jscomp$11$$);
    $w$jscomp$15$$ = Math.round($w$jscomp$15$$ * $factor$jscomp$1$$);
    $h$jscomp$11$$ = Math.round($h$jscomp$11$$ * $factor$jscomp$1$$);
  }
  $Browser$resizeCanvas$$ ? ($canvas$jscomp$11$$.width != $w$jscomp$15$$ && ($canvas$jscomp$11$$.width = $w$jscomp$15$$), $canvas$jscomp$11$$.height != $h$jscomp$11$$ && ($canvas$jscomp$11$$.height = $h$jscomp$11$$), "undefined" != typeof $canvas$jscomp$11$$.style && ($canvas$jscomp$11$$.style.removeProperty("width"), $canvas$jscomp$11$$.style.removeProperty("height"))) : ($canvas$jscomp$11$$.width != $wNative$$ && ($canvas$jscomp$11$$.width = $wNative$$), $canvas$jscomp$11$$.height != $hNative$$ && 
  ($canvas$jscomp$11$$.height = $hNative$$), "undefined" != typeof $canvas$jscomp$11$$.style && ($w$jscomp$15$$ != $wNative$$ || $h$jscomp$11$$ != $hNative$$ ? ($canvas$jscomp$11$$.style.setProperty("width", $w$jscomp$15$$ + "px", "important"), $canvas$jscomp$11$$.style.setProperty("height", $h$jscomp$11$$ + "px", "important")) : ($canvas$jscomp$11$$.style.removeProperty("width"), $canvas$jscomp$11$$.style.removeProperty("height"))));
}
var $Browser$$ = {}, $Browser$initted$$, $GLctx$$, $webgl_enable_ANGLE_instanced_arrays$$ = $ctx$jscomp$2$$ => {
  var $ext$jscomp$1$$ = $ctx$jscomp$2$$.getExtension("ANGLE_instanced_arrays");
  $ext$jscomp$1$$ && ($ctx$jscomp$2$$.vertexAttribDivisor = ($index$jscomp$103$$, $divisor$jscomp$3$$) => $ext$jscomp$1$$.vertexAttribDivisorANGLE($index$jscomp$103$$, $divisor$jscomp$3$$), $ctx$jscomp$2$$.drawArraysInstanced = ($mode$jscomp$55$$, $first$jscomp$4$$, $count$jscomp$40$$, $primcount$jscomp$2$$) => $ext$jscomp$1$$.drawArraysInstancedANGLE($mode$jscomp$55$$, $first$jscomp$4$$, $count$jscomp$40$$, $primcount$jscomp$2$$), $ctx$jscomp$2$$.drawElementsInstanced = ($mode$jscomp$56$$, $count$jscomp$41$$, 
  $type$jscomp$177$$, $indices$$, $primcount$jscomp$3$$) => $ext$jscomp$1$$.drawElementsInstancedANGLE($mode$jscomp$56$$, $count$jscomp$41$$, $type$jscomp$177$$, $indices$$, $primcount$jscomp$3$$));
}, $webgl_enable_OES_vertex_array_object$$ = $ctx$jscomp$3$$ => {
  var $ext$jscomp$2$$ = $ctx$jscomp$3$$.getExtension("OES_vertex_array_object");
  $ext$jscomp$2$$ && ($ctx$jscomp$3$$.createVertexArray = () => $ext$jscomp$2$$.createVertexArrayOES(), $ctx$jscomp$3$$.deleteVertexArray = $vao$$ => $ext$jscomp$2$$.deleteVertexArrayOES($vao$$), $ctx$jscomp$3$$.bindVertexArray = $vao$jscomp$1$$ => $ext$jscomp$2$$.bindVertexArrayOES($vao$jscomp$1$$), $ctx$jscomp$3$$.isVertexArray = $vao$jscomp$2$$ => $ext$jscomp$2$$.isVertexArrayOES($vao$jscomp$2$$));
}, $webgl_enable_WEBGL_draw_buffers$$ = $ctx$jscomp$4$$ => {
  var $ext$jscomp$3$$ = $ctx$jscomp$4$$.getExtension("WEBGL_draw_buffers");
  $ext$jscomp$3$$ && ($ctx$jscomp$4$$.drawBuffers = ($n$jscomp$5$$, $bufs$$) => $ext$jscomp$3$$.drawBuffersWEBGL($n$jscomp$5$$, $bufs$$));
}, $getEmscriptenSupportedExtensions$$ = $ctx$jscomp$9$$ => {
  var $supportedExtensions$$ = "ANGLE_instanced_arrays EXT_blend_minmax EXT_disjoint_timer_query EXT_frag_depth EXT_shader_texture_lod EXT_sRGB OES_element_index_uint OES_fbo_render_mipmap OES_standard_derivatives OES_texture_float OES_texture_half_float OES_texture_half_float_linear OES_vertex_array_object WEBGL_color_buffer_float WEBGL_depth_texture WEBGL_draw_buffers EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
  return ($ctx$jscomp$9$$.getSupportedExtensions() || []).filter($ext$jscomp$4$$ => $supportedExtensions$$.includes($ext$jscomp$4$$));
}, $GL$counter$$ = 1, $GL$buffers$$ = [], $GL$programs$$ = [], $GL$framebuffers$$ = [], $GL$renderbuffers$$ = [], $GL$textures$$ = [], $GL$shaders$$ = [], $GL$vaos$$ = [], $GL$contexts$$ = [], $GL$queries$$ = [], $GL$stringCache$$ = {}, $GL$unpackAlignment$$ = 4, $GL$unpackRowLength$$ = 0, $GL$getNewId$$ = $table$$ => {
  for (var $ret$jscomp$10$$ = $GL$counter$$++, $i$jscomp$28$$ = $table$$.length; $i$jscomp$28$$ < $ret$jscomp$10$$; $i$jscomp$28$$++) {
    $table$$[$i$jscomp$28$$] = null;
  }
  return $ret$jscomp$10$$;
}, $GL$genObject$$ = ($n$jscomp$6$$, $buffers$jscomp$2$$, $createFunction$$, $objectTable$$) => {
  for (var $i$jscomp$29$$ = 0; $i$jscomp$29$$ < $n$jscomp$6$$; $i$jscomp$29$$++) {
    var $buffer$jscomp$41$$ = $GLctx$$[$createFunction$$](), $id$jscomp$12$$ = $buffer$jscomp$41$$ && $GL$getNewId$$($objectTable$$);
    $buffer$jscomp$41$$ ? ($buffer$jscomp$41$$.name = $id$jscomp$12$$, $objectTable$$[$id$jscomp$12$$] = $buffer$jscomp$41$$) : $GL$lastError$$ ||= 1282;
    $HEAP32$$[$buffers$jscomp$2$$ + 4 * $i$jscomp$29$$ >>> 2 >>> 0] = $id$jscomp$12$$;
  }
}, $GL$createContext$$ = ($canvas$jscomp$12$$, $webGLContextAttributes$jscomp$1$$) => {
  $canvas$jscomp$12$$.$j$ || ($canvas$jscomp$12$$.$j$ = $canvas$jscomp$12$$.getContext, $canvas$jscomp$12$$.getContext = function($ver$$, $attrs_gl$$) {
    $attrs_gl$$ = $canvas$jscomp$12$$.$j$($ver$$, $attrs_gl$$);
    return "webgl" == $ver$$ == $attrs_gl$$ instanceof WebGLRenderingContext ? $attrs_gl$$ : null;
  });
  var $ctx$jscomp$10$$ = $canvas$jscomp$12$$.getContext("webgl", $webGLContextAttributes$jscomp$1$$);
  return $ctx$jscomp$10$$ ? $GL$registerContext$$($ctx$jscomp$10$$, $webGLContextAttributes$jscomp$1$$) : 0;
}, $GL$registerContext$$ = ($ctx$jscomp$11$$, $webGLContextAttributes$jscomp$2$$) => {
  var $handle$jscomp$13$$ = $GL$getNewId$$($GL$contexts$$), $context$jscomp$6$$ = {handle:$handle$jscomp$13$$, attributes:$webGLContextAttributes$jscomp$2$$, version:$webGLContextAttributes$jscomp$2$$.$majorVersion$, $GLctx$:$ctx$jscomp$11$$};
  $ctx$jscomp$11$$.canvas && ($ctx$jscomp$11$$.canvas.$GLctxObject$ = $context$jscomp$6$$);
  $GL$contexts$$[$handle$jscomp$13$$] = $context$jscomp$6$$;
  ("undefined" == typeof $webGLContextAttributes$jscomp$2$$.$enableExtensionsByDefault$ || $webGLContextAttributes$jscomp$2$$.$enableExtensionsByDefault$) && $GL$initExtensions$$($context$jscomp$6$$);
  return $handle$jscomp$13$$;
}, $GL$makeContextCurrent$$ = $contextHandle$jscomp$1$$ => {
  $GL$currentContext$$ = $GL$contexts$$[$contextHandle$jscomp$1$$];
  $Module$$.ctx = $GLctx$$ = $GL$currentContext$$?.$GLctx$;
  return !($contextHandle$jscomp$1$$ && !$GLctx$$);
}, $GL$initExtensions$$ = $context$jscomp$7$$ => {
  $context$jscomp$7$$ ||= $GL$currentContext$$;
  if (!$context$jscomp$7$$.$initExtensionsDone$) {
    $context$jscomp$7$$.$initExtensionsDone$ = !0;
    var $GLctx$jscomp$1$$ = $context$jscomp$7$$.$GLctx$;
    $GLctx$jscomp$1$$.$multiDrawWebgl$ = $GLctx$jscomp$1$$.getExtension("WEBGL_multi_draw");
    $GLctx$jscomp$1$$.$extPolygonOffsetClamp$ = $GLctx$jscomp$1$$.getExtension("EXT_polygon_offset_clamp");
    $GLctx$jscomp$1$$.$extClipControl$ = $GLctx$jscomp$1$$.getExtension("EXT_clip_control");
    $GLctx$jscomp$1$$.$webglPolygonMode$ = $GLctx$jscomp$1$$.getExtension("WEBGL_polygon_mode");
    $webgl_enable_ANGLE_instanced_arrays$$($GLctx$jscomp$1$$);
    $webgl_enable_OES_vertex_array_object$$($GLctx$jscomp$1$$);
    $webgl_enable_WEBGL_draw_buffers$$($GLctx$jscomp$1$$);
    $GLctx$jscomp$1$$.$disjointTimerQueryExt$ = $GLctx$jscomp$1$$.getExtension("EXT_disjoint_timer_query");
    $getEmscriptenSupportedExtensions$$($GLctx$jscomp$1$$).forEach($ext$jscomp$5$$ => {
      $ext$jscomp$5$$.includes("lose_context") || $ext$jscomp$5$$.includes("debug") || $GLctx$jscomp$1$$.getExtension($ext$jscomp$5$$);
    });
  }
}, $GL$$ = {}, $GL$lastError$$, $GL$currentContext$$, $tempFixedLengthArray$$ = [], $__glGetActiveAttribOrUniform$$ = ($funcName_info$jscomp$2$$, $program$jscomp$68$$, $index$jscomp$107$$, $bufSize_numBytesWrittenExclNull$$, $length$jscomp$45$$, $size$jscomp$32$$, $type$jscomp$180$$, $name$jscomp$113$$) => {
  $program$jscomp$68$$ = $GL$programs$$[$program$jscomp$68$$];
  if ($funcName_info$jscomp$2$$ = $GLctx$$[$funcName_info$jscomp$2$$]($program$jscomp$68$$, $index$jscomp$107$$)) {
    $bufSize_numBytesWrittenExclNull$$ = $name$jscomp$113$$ && $stringToUTF8$$($funcName_info$jscomp$2$$.name, $name$jscomp$113$$, $bufSize_numBytesWrittenExclNull$$), $length$jscomp$45$$ && ($HEAP32$$[$length$jscomp$45$$ >>> 2 >>> 0] = $bufSize_numBytesWrittenExclNull$$), $size$jscomp$32$$ && ($HEAP32$$[$size$jscomp$32$$ >>> 2 >>> 0] = $funcName_info$jscomp$2$$.size), $type$jscomp$180$$ && ($HEAP32$$[$type$jscomp$180$$ >>> 2 >>> 0] = $funcName_info$jscomp$2$$.type);
  }
}, $readI53FromI64$$ = $ptr$jscomp$11$$ => $HEAPU32$$[$ptr$jscomp$11$$ >>> 2 >>> 0] + 4294967296 * $HEAP32$$[$ptr$jscomp$11$$ + 4 >>> 2 >>> 0], $writeI53ToI64$$ = ($offset$jscomp$85_ptr$jscomp$13$$, $num$jscomp$7$$) => {
  $HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ >>> 2 >>> 0] = $num$jscomp$7$$;
  $HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ + 4 >>> 2 >>> 0] = ($num$jscomp$7$$ - $HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ >>> 2 >>> 0]) / 4294967296;
  var $deserialized$$ = 0 <= $num$jscomp$7$$ ? $HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ >>> 2 >>> 0] + 4294967296 * $HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ + 4 >>> 2 >>> 0] : $readI53FromI64$$($offset$jscomp$85_ptr$jscomp$13$$);
  $offset$jscomp$85_ptr$jscomp$13$$ >>>= 2;
  $deserialized$$ != $num$jscomp$7$$ && $warnOnce$$(`writeI53ToI64() out of range: serialized JS Number ${$num$jscomp$7$$} to Wasm heap as bytes lo=${$ptrToString$$($HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ >>> 0])}, hi=${$ptrToString$$($HEAPU32$$[$offset$jscomp$85_ptr$jscomp$13$$ + 1 >>> 0])}, which deserializes back to ${$deserialized$$} instead!`);
}, $emscriptenWebGLGet$$ = ($i$jscomp$40_name_$$, $p$jscomp$7$$, $type$jscomp$183$$) => {
  if ($p$jscomp$7$$) {
    var $ret$jscomp$11$$ = void 0;
    switch($i$jscomp$40_name_$$) {
      case 36346:
        $ret$jscomp$11$$ = 1;
        break;
      case 36344:
        0 != $type$jscomp$183$$ && 1 != $type$jscomp$183$$ && ($GL$lastError$$ ||= 1280);
        return;
      case 36345:
        $ret$jscomp$11$$ = 0;
        break;
      case 34466:
        var $formats_result$jscomp$8$$ = $GLctx$$.getParameter(34467);
        $ret$jscomp$11$$ = $formats_result$jscomp$8$$ ? $formats_result$jscomp$8$$.length : 0;
    }
    if (void 0 === $ret$jscomp$11$$) {
      switch($formats_result$jscomp$8$$ = $GLctx$$.getParameter($i$jscomp$40_name_$$), typeof $formats_result$jscomp$8$$) {
        case "number":
          $ret$jscomp$11$$ = $formats_result$jscomp$8$$;
          break;
        case "boolean":
          $ret$jscomp$11$$ = $formats_result$jscomp$8$$ ? 1 : 0;
          break;
        case "string":
          $GL$lastError$$ ||= 1280;
          return;
        case "object":
          if (null === $formats_result$jscomp$8$$) {
            switch($i$jscomp$40_name_$$) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 34068:
                $ret$jscomp$11$$ = 0;
                break;
              default:
                $GL$lastError$$ ||= 1280;
                return;
            }
          } else {
            if ($formats_result$jscomp$8$$ instanceof Float32Array || $formats_result$jscomp$8$$ instanceof Uint32Array || $formats_result$jscomp$8$$ instanceof Int32Array || $formats_result$jscomp$8$$ instanceof Array) {
              for ($i$jscomp$40_name_$$ = 0; $i$jscomp$40_name_$$ < $formats_result$jscomp$8$$.length; ++$i$jscomp$40_name_$$) {
                switch($type$jscomp$183$$) {
                  case 0:
                    $HEAP32$$[$p$jscomp$7$$ + 4 * $i$jscomp$40_name_$$ >>> 2 >>> 0] = $formats_result$jscomp$8$$[$i$jscomp$40_name_$$];
                    break;
                  case 2:
                    $HEAPF32$$[$p$jscomp$7$$ + 4 * $i$jscomp$40_name_$$ >>> 2 >>> 0] = $formats_result$jscomp$8$$[$i$jscomp$40_name_$$];
                    break;
                  case 4:
                    $HEAP8$$[$p$jscomp$7$$ + $i$jscomp$40_name_$$ >>> 0] = $formats_result$jscomp$8$$[$i$jscomp$40_name_$$] ? 1 : 0;
                }
              }
              return;
            }
            try {
              $ret$jscomp$11$$ = $formats_result$jscomp$8$$.name | 0;
            } catch ($e$jscomp$42$$) {
              $GL$lastError$$ ||= 1280;
              $err$$(`GL_INVALID_ENUM in glGet${$type$jscomp$183$$}v: Unknown object returned from WebGL getParameter(${$i$jscomp$40_name_$$})! (error: ${$e$jscomp$42$$})`);
              return;
            }
          }
          break;
        default:
          $GL$lastError$$ ||= 1280;
          $err$$(`GL_INVALID_ENUM in glGet${$type$jscomp$183$$}v: Native code calling glGet${$type$jscomp$183$$}v(${$i$jscomp$40_name_$$}) and it returns ${$formats_result$jscomp$8$$} of type ${typeof $formats_result$jscomp$8$$}!`);
          return;
      }
    }
    switch($type$jscomp$183$$) {
      case 1:
        $writeI53ToI64$$($p$jscomp$7$$, $ret$jscomp$11$$);
        break;
      case 0:
        $HEAP32$$[$p$jscomp$7$$ >>> 2 >>> 0] = $ret$jscomp$11$$;
        break;
      case 2:
        $HEAPF32$$[$p$jscomp$7$$ >>> 2 >>> 0] = $ret$jscomp$11$$;
        break;
      case 4:
        $HEAP8$$[$p$jscomp$7$$ >>> 0] = $ret$jscomp$11$$ ? 1 : 0;
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
};
function $_glGetQueryObjecti64vEXT$$($id$jscomp$26_param$jscomp$7$$, $pname$jscomp$28$$, $params$jscomp$2$$) {
  if ($params$jscomp$2$$ >>>= 0) {
    $id$jscomp$26_param$jscomp$7$$ = $GLctx$$.$disjointTimerQueryExt$.getQueryObjectEXT($GL$queries$$[$id$jscomp$26_param$jscomp$7$$], $pname$jscomp$28$$);
    var $ret$jscomp$12$$;
    "boolean" == typeof $id$jscomp$26_param$jscomp$7$$ ? $ret$jscomp$12$$ = $id$jscomp$26_param$jscomp$7$$ ? 1 : 0 : $ret$jscomp$12$$ = $id$jscomp$26_param$jscomp$7$$;
    $writeI53ToI64$$($params$jscomp$2$$, $ret$jscomp$12$$);
  } else {
    $GL$lastError$$ ||= 1281;
  }
}
function $_glGetQueryObjectivEXT$$($id$jscomp$27_param$jscomp$8$$, $pname$jscomp$29$$, $params$jscomp$3$$) {
  if ($params$jscomp$3$$ >>>= 0) {
    $id$jscomp$27_param$jscomp$8$$ = $GLctx$$.$disjointTimerQueryExt$.getQueryObjectEXT($GL$queries$$[$id$jscomp$27_param$jscomp$8$$], $pname$jscomp$29$$);
    var $ret$jscomp$13$$;
    "boolean" == typeof $id$jscomp$27_param$jscomp$8$$ ? $ret$jscomp$13$$ = $id$jscomp$27_param$jscomp$8$$ ? 1 : 0 : $ret$jscomp$13$$ = $id$jscomp$27_param$jscomp$8$$;
    $HEAP32$$[$params$jscomp$3$$ >>> 2 >>> 0] = $ret$jscomp$13$$;
  } else {
    $GL$lastError$$ ||= 1281;
  }
}
var $stringToNewUTF8$$ = $str$jscomp$15$$ => {
  var $size$jscomp$35$$ = $lengthBytesUTF8$$($str$jscomp$15$$) + 1, $ret$jscomp$14$$ = $_malloc$$($size$jscomp$35$$);
  $ret$jscomp$14$$ && $stringToUTF8$$($str$jscomp$15$$, $ret$jscomp$14$$, $size$jscomp$35$$);
  return $ret$jscomp$14$$;
}, $webglGetExtensions$$ = () => {
  var $exts$$ = $getEmscriptenSupportedExtensions$$($GLctx$$);
  return $exts$$ = $exts$$.concat($exts$$.map($e$jscomp$43$$ => "GL_" + $e$jscomp$43$$));
}, $webglGetLeftBracePos$$ = $name$jscomp$117$$ => "]" == $name$jscomp$117$$.slice(-1) && $name$jscomp$117$$.lastIndexOf("["), $webglPrepareUniformLocationsBeforeFirstUse$$ = $program$jscomp$75$$ => {
  var $uniformLocsById$$ = $program$jscomp$75$$.$uniformLocsById$, $uniformSizeAndIdsByName$$ = $program$jscomp$75$$.$uniformSizeAndIdsByName$, $i$jscomp$42$$;
  if (!$uniformLocsById$$) {
    $program$jscomp$75$$.$uniformLocsById$ = $uniformLocsById$$ = {};
    $program$jscomp$75$$.$uniformArrayNamesById$ = {};
    var $numActiveUniforms$jscomp$1$$ = $GLctx$$.getProgramParameter($program$jscomp$75$$, 35718);
    for ($i$jscomp$42$$ = 0; $i$jscomp$42$$ < $numActiveUniforms$jscomp$1$$; ++$i$jscomp$42$$) {
      var $sz$jscomp$1_u$jscomp$1$$ = $GLctx$$.getActiveUniform($program$jscomp$75$$, $i$jscomp$42$$);
      var $j_nm$$ = $sz$jscomp$1_u$jscomp$1$$.name;
      $sz$jscomp$1_u$jscomp$1$$ = $sz$jscomp$1_u$jscomp$1$$.size;
      var $arrayName_lb$$ = $webglGetLeftBracePos$$($j_nm$$);
      $arrayName_lb$$ = 0 < $arrayName_lb$$ ? $j_nm$$.slice(0, $arrayName_lb$$) : $j_nm$$;
      var $id$jscomp$28$$ = $program$jscomp$75$$.$uniformIdCounter$;
      $program$jscomp$75$$.$uniformIdCounter$ += $sz$jscomp$1_u$jscomp$1$$;
      $uniformSizeAndIdsByName$$[$arrayName_lb$$] = [$sz$jscomp$1_u$jscomp$1$$, $id$jscomp$28$$];
      for ($j_nm$$ = 0; $j_nm$$ < $sz$jscomp$1_u$jscomp$1$$; ++$j_nm$$) {
        $uniformLocsById$$[$id$jscomp$28$$] = $j_nm$$, $program$jscomp$75$$.$uniformArrayNamesById$[$id$jscomp$28$$++] = $arrayName_lb$$;
      }
    }
  }
}, $webglGetUniformLocation$$ = $location$jscomp$79$$ => {
  var $p$jscomp$13$$ = $GLctx$$.$currentProgram$;
  if ($p$jscomp$13$$) {
    var $webglLoc$$ = $p$jscomp$13$$.$uniformLocsById$[$location$jscomp$79$$];
    "number" == typeof $webglLoc$$ && ($p$jscomp$13$$.$uniformLocsById$[$location$jscomp$79$$] = $webglLoc$$ = $GLctx$$.getUniformLocation($p$jscomp$13$$, $p$jscomp$13$$.$uniformArrayNamesById$[$location$jscomp$79$$] + (0 < $webglLoc$$ ? `[${$webglLoc$$}]` : "")));
    return $webglLoc$$;
  }
  $GL$lastError$$ ||= 1282;
}, $emscriptenWebGLGetUniform$$ = ($data$jscomp$100_program$jscomp$77$$, $i$jscomp$43_location$jscomp$80$$, $params$jscomp$8$$, $type$jscomp$184$$) => {
  if ($params$jscomp$8$$) {
    if ($data$jscomp$100_program$jscomp$77$$ = $GL$programs$$[$data$jscomp$100_program$jscomp$77$$], $webglPrepareUniformLocationsBeforeFirstUse$$($data$jscomp$100_program$jscomp$77$$), $data$jscomp$100_program$jscomp$77$$ = $GLctx$$.getUniform($data$jscomp$100_program$jscomp$77$$, $webglGetUniformLocation$$($i$jscomp$43_location$jscomp$80$$)), "number" == typeof $data$jscomp$100_program$jscomp$77$$ || "boolean" == typeof $data$jscomp$100_program$jscomp$77$$) {
      switch($type$jscomp$184$$) {
        case 0:
          $HEAP32$$[$params$jscomp$8$$ >>> 2 >>> 0] = $data$jscomp$100_program$jscomp$77$$;
          break;
        case 2:
          $HEAPF32$$[$params$jscomp$8$$ >>> 2 >>> 0] = $data$jscomp$100_program$jscomp$77$$;
      }
    } else {
      for ($i$jscomp$43_location$jscomp$80$$ = 0; $i$jscomp$43_location$jscomp$80$$ < $data$jscomp$100_program$jscomp$77$$.length; $i$jscomp$43_location$jscomp$80$$++) {
        switch($type$jscomp$184$$) {
          case 0:
            $HEAP32$$[$params$jscomp$8$$ + 4 * $i$jscomp$43_location$jscomp$80$$ >>> 2 >>> 0] = $data$jscomp$100_program$jscomp$77$$[$i$jscomp$43_location$jscomp$80$$];
            break;
          case 2:
            $HEAPF32$$[$params$jscomp$8$$ + 4 * $i$jscomp$43_location$jscomp$80$$ >>> 2 >>> 0] = $data$jscomp$100_program$jscomp$77$$[$i$jscomp$43_location$jscomp$80$$];
        }
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $emscriptenWebGLGetVertexAttrib$$ = ($data$jscomp$101_index$jscomp$111$$, $i$jscomp$44_pname$jscomp$36$$, $params$jscomp$11$$, $type$jscomp$185$$) => {
  if ($params$jscomp$11$$) {
    if ($data$jscomp$101_index$jscomp$111$$ = $GLctx$$.getVertexAttrib($data$jscomp$101_index$jscomp$111$$, $i$jscomp$44_pname$jscomp$36$$), 34975 == $i$jscomp$44_pname$jscomp$36$$) {
      $HEAP32$$[$params$jscomp$11$$ >>> 2 >>> 0] = $data$jscomp$101_index$jscomp$111$$ && $data$jscomp$101_index$jscomp$111$$.name;
    } else if ("number" == typeof $data$jscomp$101_index$jscomp$111$$ || "boolean" == typeof $data$jscomp$101_index$jscomp$111$$) {
      switch($type$jscomp$185$$) {
        case 0:
          $HEAP32$$[$params$jscomp$11$$ >>> 2 >>> 0] = $data$jscomp$101_index$jscomp$111$$;
          break;
        case 2:
          $HEAPF32$$[$params$jscomp$11$$ >>> 2 >>> 0] = $data$jscomp$101_index$jscomp$111$$;
          break;
        case 5:
          $HEAP32$$[$params$jscomp$11$$ >>> 2 >>> 0] = Math.fround($data$jscomp$101_index$jscomp$111$$);
      }
    } else {
      for ($i$jscomp$44_pname$jscomp$36$$ = 0; $i$jscomp$44_pname$jscomp$36$$ < $data$jscomp$101_index$jscomp$111$$.length; $i$jscomp$44_pname$jscomp$36$$++) {
        switch($type$jscomp$185$$) {
          case 0:
            $HEAP32$$[$params$jscomp$11$$ + 4 * $i$jscomp$44_pname$jscomp$36$$ >>> 2 >>> 0] = $data$jscomp$101_index$jscomp$111$$[$i$jscomp$44_pname$jscomp$36$$];
            break;
          case 2:
            $HEAPF32$$[$params$jscomp$11$$ + 4 * $i$jscomp$44_pname$jscomp$36$$ >>> 2 >>> 0] = $data$jscomp$101_index$jscomp$111$$[$i$jscomp$44_pname$jscomp$36$$];
            break;
          case 5:
            $HEAP32$$[$params$jscomp$11$$ + 4 * $i$jscomp$44_pname$jscomp$36$$ >>> 2 >>> 0] = Math.fround($data$jscomp$101_index$jscomp$111$$[$i$jscomp$44_pname$jscomp$36$$]);
        }
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, $emscriptenWebGLGetTexPixelData$$ = ($heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$, $bytes$jscomp$3_format$jscomp$22$$, $width$jscomp$37$$, $height$jscomp$34$$, $pixels$jscomp$1$$) => {
  $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ -= 5120;
  $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ = 1 == $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ ? $HEAPU8$$ : 4 == $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ ? $HEAP32$$ : 6 == $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ ? $HEAPF32$$ : 5 == $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ || 28922 == $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$ ? $HEAPU32$$ : $HEAPU16$$;
  $bytes$jscomp$3_format$jscomp$22$$ = $height$jscomp$34$$ * (($GL$unpackRowLength$$ || $width$jscomp$37$$) * ({5:3, 6:4, 8:2, 29502:3, 29504:4}[$bytes$jscomp$3_format$jscomp$22$$ - 6402] || 1) * $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$.BYTES_PER_ELEMENT + $GL$unpackAlignment$$ - 1 & -$GL$unpackAlignment$$);
  return $heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$.subarray($pixels$jscomp$1$$ >>> 31 - Math.clz32($heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$.BYTES_PER_ELEMENT) >>> 0, $pixels$jscomp$1$$ + $bytes$jscomp$3_format$jscomp$22$$ >>> 31 - Math.clz32($heap$jscomp$2_type$jscomp$187_type$jscomp$inline_188$$.BYTES_PER_ELEMENT) >>> 0);
}, $miniTempWebGLFloatBuffers$$ = [], $miniTempWebGLIntBuffers$$ = [], $doRequestFullscreen$$ = ($target$jscomp$127$$, $strategy$jscomp$2$$) => {
  if (!$JSEvents$$.fullscreenEnabled()) {
    return -1;
  }
  $target$jscomp$127$$ = $findEventTarget$$($target$jscomp$127$$);
  return $target$jscomp$127$$ ? $target$jscomp$127$$.requestFullscreen || $target$jscomp$127$$.webkitRequestFullscreen ? $JSCompiler_StaticMethods_canPerformEventHandlerRequests$$() ? $JSEvents_requestFullscreen$$($target$jscomp$127$$, $strategy$jscomp$2$$) : $strategy$jscomp$2$$.$deferUntilInEventHandler$ ? ($JSCompiler_StaticMethods_deferCall$$($JSEvents_requestFullscreen$$, 1, [$target$jscomp$127$$, $strategy$jscomp$2$$]), 1) : -2 : -3 : -4;
}, $_emscripten_sample_gamepad_data$$ = () => {
  try {
    if (navigator.getGamepads) {
      return ($JSEvents$$.$lastGamepadState$ = navigator.getGamepads()) ? 0 : -1;
    }
  } catch ($e$jscomp$45$$) {
    $err$$(`navigator.getGamepads() exists, but failed to execute with exception ${$e$jscomp$45$$}. Disabling Gamepad access.`), navigator.getGamepads = null;
  }
  return -1;
}, $registerBeforeUnloadEventCallback$$ = ($userData$$, $callbackfunc$$) => {
  var $eventHandler$jscomp$1$$ = {target:$findEventTarget$$(2), $eventTypeString$:"beforeunload", $callbackfunc$:$callbackfunc$$, $handlerFunc$:($e$jscomp$46$$ = event) => {
    var $confirmationMessage$$ = $dynCall_iiii$$($callbackfunc$$, 28, 0, $userData$$);
    $confirmationMessage$$ &&= $UTF8ToString$$($confirmationMessage$$);
    if ($confirmationMessage$$) {
      return $e$jscomp$46$$.preventDefault(), $e$jscomp$46$$.returnValue = $confirmationMessage$$;
    }
  }, $useCapture$:!0};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$1$$);
}, $registerFocusEventCallback$$ = ($eventHandler$jscomp$2_target$jscomp$131$$, $userData$jscomp$2$$, $useCapture$jscomp$1$$, $callbackfunc$jscomp$2$$, $eventTypeId$jscomp$1$$, $eventTypeString$jscomp$2$$) => {
  $JSEvents$$.$focusEvent$ || ($JSEvents$$.$focusEvent$ = $_malloc$$(256));
  $eventHandler$jscomp$2_target$jscomp$131$$ = {target:$findEventTarget$$($eventHandler$jscomp$2_target$jscomp$131$$), $eventTypeString$:$eventTypeString$jscomp$2$$, $callbackfunc$:$callbackfunc$jscomp$2$$, $handlerFunc$:($e$jscomp$47$$ = event) => {
    var $id$jscomp$32$$ = $e$jscomp$47$$.target.id ? $e$jscomp$47$$.target.id : "", $focusEvent$$ = $JSEvents$$.$focusEvent$;
    $stringToUTF8$$($JSCompiler_StaticMethods_getNodeNameForTarget$$($e$jscomp$47$$.target), $focusEvent$$ + 0, 128);
    $stringToUTF8$$($id$jscomp$32$$, $focusEvent$$ + 128, 128);
    $dynCall_iiii$$($callbackfunc$jscomp$2$$, $eventTypeId$jscomp$1$$, $focusEvent$$, $userData$jscomp$2$$) && $e$jscomp$47$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$1$$};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$2_target$jscomp$131$$);
}, $registerFullscreenChangeEventCallback$$ = ($target$jscomp$135$$, $userData$jscomp$5$$, $useCapture$jscomp$4$$, $callbackfunc$jscomp$5$$, $eventTypeString$jscomp$3$$) => {
  $JSEvents$$.$fullscreenChangeEvent$ || ($JSEvents$$.$fullscreenChangeEvent$ = $_malloc$$(276));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$135$$, $eventTypeString$:$eventTypeString$jscomp$3$$, $callbackfunc$:$callbackfunc$jscomp$5$$, $handlerFunc$:($e$jscomp$48$$ = event) => {
    var $fullscreenChangeEvent$$ = $JSEvents$$.$fullscreenChangeEvent$, $fullscreenElement$jscomp$inline_470$$ = $getFullscreenElement$$(), $isFullscreen$jscomp$inline_471$$ = !!$fullscreenElement$jscomp$inline_470$$;
    $HEAP8$$[$fullscreenChangeEvent$$ >>> 0] = $isFullscreen$jscomp$inline_471$$;
    $HEAP8$$[$fullscreenChangeEvent$$ + 1 >>> 0] = $JSEvents$$.fullscreenEnabled();
    var $reportedElement$jscomp$inline_472$$ = $isFullscreen$jscomp$inline_471$$ ? $fullscreenElement$jscomp$inline_470$$ : $JSEvents$$.$previousFullscreenElement$, $id$jscomp$inline_473$$ = $reportedElement$jscomp$inline_472$$?.id || "";
    $stringToUTF8$$($JSCompiler_StaticMethods_getNodeNameForTarget$$($reportedElement$jscomp$inline_472$$), $fullscreenChangeEvent$$ + 2, 128);
    $stringToUTF8$$($id$jscomp$inline_473$$, $fullscreenChangeEvent$$ + 130, 128);
    $HEAP32$$[$fullscreenChangeEvent$$ + 260 >>> 2 >>> 0] = $reportedElement$jscomp$inline_472$$ ? $reportedElement$jscomp$inline_472$$.clientWidth : 0;
    $HEAP32$$[$fullscreenChangeEvent$$ + 264 >>> 2 >>> 0] = $reportedElement$jscomp$inline_472$$ ? $reportedElement$jscomp$inline_472$$.clientHeight : 0;
    $HEAP32$$[$fullscreenChangeEvent$$ + 268 >>> 2 >>> 0] = screen.width;
    $HEAP32$$[$fullscreenChangeEvent$$ + 272 >>> 2 >>> 0] = screen.height;
    $isFullscreen$jscomp$inline_471$$ && ($JSEvents$$.$previousFullscreenElement$ = $fullscreenElement$jscomp$inline_470$$);
    $dynCall_iiii$$($callbackfunc$jscomp$5$$, 19, $fullscreenChangeEvent$$, $userData$jscomp$5$$) && $e$jscomp$48$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$4$$});
}, $registerGamepadEventCallback$$ = ($userData$jscomp$7$$, $eventHandler$jscomp$4_useCapture$jscomp$6$$, $callbackfunc$jscomp$7$$, $eventTypeId$jscomp$3$$, $eventTypeString$jscomp$4$$) => {
  $JSEvents$$.$gamepadEvent$ || ($JSEvents$$.$gamepadEvent$ = $_malloc$$(1240));
  $eventHandler$jscomp$4_useCapture$jscomp$6$$ = {target:$findEventTarget$$(2), $allowsDeferredCalls$:!0, $eventTypeString$:$eventTypeString$jscomp$4$$, $callbackfunc$:$callbackfunc$jscomp$7$$, $handlerFunc$:($e$jscomp$49$$ = event) => {
    var $gamepadEvent$$ = $JSEvents$$.$gamepadEvent$;
    $fillGamepadEventData$$($gamepadEvent$$, $e$jscomp$49$$.gamepad);
    $dynCall_iiii$$($callbackfunc$jscomp$7$$, $eventTypeId$jscomp$3$$, $gamepadEvent$$, $userData$jscomp$7$$) && $e$jscomp$49$$.preventDefault();
  }, $useCapture$:$eventHandler$jscomp$4_useCapture$jscomp$6$$};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$4_useCapture$jscomp$6$$);
}, $registerKeyEventCallback$$ = ($eventHandler$jscomp$5_target$jscomp$138$$, $userData$jscomp$10$$, $useCapture$jscomp$9$$, $callbackfunc$jscomp$10$$, $eventTypeId$jscomp$4$$, $eventTypeString$jscomp$5$$) => {
  $JSEvents$$.$keyEvent$ || ($JSEvents$$.$keyEvent$ = $_malloc$$(160));
  $eventHandler$jscomp$5_target$jscomp$138$$ = {target:$findEventTarget$$($eventHandler$jscomp$5_target$jscomp$138$$), $eventTypeString$:$eventTypeString$jscomp$5$$, $callbackfunc$:$callbackfunc$jscomp$10$$, $handlerFunc$:$e$jscomp$50$$ => {
    $assert$$($e$jscomp$50$$);
    var $keyEventData$$ = $JSEvents$$.$keyEvent$;
    $HEAPF64$$[$keyEventData$$ >>> 3 >>> 0] = $e$jscomp$50$$.timeStamp;
    var $idx$jscomp$5$$ = $keyEventData$$ >>> 2;
    $HEAP32$$[$idx$jscomp$5$$ + 2 >>> 0] = $e$jscomp$50$$.location;
    $HEAP8$$[$keyEventData$$ + 12 >>> 0] = $e$jscomp$50$$.ctrlKey;
    $HEAP8$$[$keyEventData$$ + 13 >>> 0] = $e$jscomp$50$$.shiftKey;
    $HEAP8$$[$keyEventData$$ + 14 >>> 0] = $e$jscomp$50$$.altKey;
    $HEAP8$$[$keyEventData$$ + 15 >>> 0] = $e$jscomp$50$$.metaKey;
    $HEAP8$$[$keyEventData$$ + 16 >>> 0] = $e$jscomp$50$$.repeat;
    $HEAP32$$[$idx$jscomp$5$$ + 5 >>> 0] = $e$jscomp$50$$.charCode;
    $HEAP32$$[$idx$jscomp$5$$ + 6 >>> 0] = $e$jscomp$50$$.keyCode;
    $HEAP32$$[$idx$jscomp$5$$ + 7 >>> 0] = $e$jscomp$50$$.which;
    $stringToUTF8$$($e$jscomp$50$$.key || "", $keyEventData$$ + 32, 32);
    $stringToUTF8$$($e$jscomp$50$$.code || "", $keyEventData$$ + 64, 32);
    $stringToUTF8$$($e$jscomp$50$$.char || "", $keyEventData$$ + 96, 32);
    $stringToUTF8$$($e$jscomp$50$$.locale || "", $keyEventData$$ + 128, 32);
    $dynCall_iiii$$($callbackfunc$jscomp$10$$, $eventTypeId$jscomp$4$$, $keyEventData$$, $userData$jscomp$10$$) && $e$jscomp$50$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$9$$};
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$($eventHandler$jscomp$5_target$jscomp$138$$);
}, $fillMouseEventData$$ = ($eventStruct$jscomp$2_rect$jscomp$3$$, $e$jscomp$51$$, $target$jscomp$142$$) => {
  $assert$$(0 == $eventStruct$jscomp$2_rect$jscomp$3$$ % 4);
  $HEAPF64$$[$eventStruct$jscomp$2_rect$jscomp$3$$ >>> 3 >>> 0] = $e$jscomp$51$$.timeStamp;
  var $idx$jscomp$6$$ = $eventStruct$jscomp$2_rect$jscomp$3$$ >>> 2;
  $HEAP32$$[$idx$jscomp$6$$ + 2 >>> 0] = $e$jscomp$51$$.screenX;
  $HEAP32$$[$idx$jscomp$6$$ + 3 >>> 0] = $e$jscomp$51$$.screenY;
  $HEAP32$$[$idx$jscomp$6$$ + 4 >>> 0] = $e$jscomp$51$$.clientX;
  $HEAP32$$[$idx$jscomp$6$$ + 5 >>> 0] = $e$jscomp$51$$.clientY;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 24 >>> 0] = $e$jscomp$51$$.ctrlKey;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 25 >>> 0] = $e$jscomp$51$$.shiftKey;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 26 >>> 0] = $e$jscomp$51$$.altKey;
  $HEAP8$$[$eventStruct$jscomp$2_rect$jscomp$3$$ + 27 >>> 0] = $e$jscomp$51$$.metaKey;
  $HEAP16$$[2 * $idx$jscomp$6$$ + 14 >>> 0] = $e$jscomp$51$$.button;
  $HEAP16$$[2 * $idx$jscomp$6$$ + 15 >>> 0] = $e$jscomp$51$$.buttons;
  $HEAP32$$[$idx$jscomp$6$$ + 8 >>> 0] = $e$jscomp$51$$.movementX;
  $HEAP32$$[$idx$jscomp$6$$ + 9 >>> 0] = $e$jscomp$51$$.movementY;
  $eventStruct$jscomp$2_rect$jscomp$3$$ = $getBoundingClientRect$$($target$jscomp$142$$);
  $HEAP32$$[$idx$jscomp$6$$ + 10 >>> 0] = $e$jscomp$51$$.clientX - ($eventStruct$jscomp$2_rect$jscomp$3$$.left | 0);
  $HEAP32$$[$idx$jscomp$6$$ + 11 >>> 0] = $e$jscomp$51$$.clientY - ($eventStruct$jscomp$2_rect$jscomp$3$$.top | 0);
}, $registerMouseEventCallback$$ = ($target$jscomp$143$$, $userData$jscomp$14$$, $useCapture$jscomp$13$$, $callbackfunc$jscomp$14$$, $eventTypeId$jscomp$5$$, $eventTypeString$jscomp$6$$) => {
  $JSEvents$$.$mouseEvent$ || ($JSEvents$$.$mouseEvent$ = $_malloc$$(64));
  $target$jscomp$143$$ = $findEventTarget$$($target$jscomp$143$$);
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$143$$, $allowsDeferredCalls$:"mousemove" != $eventTypeString$jscomp$6$$ && "mouseenter" != $eventTypeString$jscomp$6$$ && "mouseleave" != $eventTypeString$jscomp$6$$, $eventTypeString$:$eventTypeString$jscomp$6$$, $callbackfunc$:$callbackfunc$jscomp$14$$, $handlerFunc$:($e$jscomp$52$$ = event) => {
    $fillMouseEventData$$($JSEvents$$.$mouseEvent$, $e$jscomp$52$$, $target$jscomp$143$$);
    $dynCall_iiii$$($callbackfunc$jscomp$14$$, $eventTypeId$jscomp$5$$, $JSEvents$$.$mouseEvent$, $userData$jscomp$14$$) && $e$jscomp$52$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$13$$});
}, $registerOrientationChangeEventCallback$$ = ($userData$jscomp$20$$, $useCapture$jscomp$19$$, $callbackfunc$jscomp$20$$) => {
  var $target$jscomp$149$$ = screen.orientation;
  $JSEvents$$.$orientationChangeEvent$ || ($JSEvents$$.$orientationChangeEvent$ = $_malloc$$(8));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$149$$, $eventTypeString$:"change", $callbackfunc$:$callbackfunc$jscomp$20$$, $handlerFunc$:($e$jscomp$53$$ = event) => {
    var $orientationChangeEvent$$ = $JSEvents$$.$orientationChangeEvent$, $orientationAngle$jscomp$inline_479_orientationsType1$jscomp$inline_476$$ = ["portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"], $orientationsType2$jscomp$inline_477$$ = ["portrait", "portrait", "landscape", "landscape"], $orientationIndex$jscomp$inline_478$$ = 0;
    var $screenOrientObj$jscomp$inline_480$$ = window.screen ? screen.orientation || screen.mozOrientation || screen.webkitOrientation : void 0;
    "object" === typeof $screenOrientObj$jscomp$inline_480$$ ? ($orientationIndex$jscomp$inline_478$$ = $orientationAngle$jscomp$inline_479_orientationsType1$jscomp$inline_476$$.indexOf($screenOrientObj$jscomp$inline_480$$.type), 0 > $orientationIndex$jscomp$inline_478$$ && ($orientationIndex$jscomp$inline_478$$ = $orientationsType2$jscomp$inline_477$$.indexOf($screenOrientObj$jscomp$inline_480$$.type)), 0 <= $orientationIndex$jscomp$inline_478$$ && ($orientationIndex$jscomp$inline_478$$ = 1 << $orientationIndex$jscomp$inline_478$$), 
    $orientationAngle$jscomp$inline_479_orientationsType1$jscomp$inline_476$$ = $screenOrientObj$jscomp$inline_480$$.angle) : $orientationAngle$jscomp$inline_479_orientationsType1$jscomp$inline_476$$ = window.orientation;
    $HEAP32$$[$orientationChangeEvent$$ >>> 2 >>> 0] = $orientationIndex$jscomp$inline_478$$;
    $HEAP32$$[$orientationChangeEvent$$ + 4 >>> 2 >>> 0] = $orientationAngle$jscomp$inline_479_orientationsType1$jscomp$inline_476$$;
    $dynCall_iiii$$($callbackfunc$jscomp$20$$, 18, $orientationChangeEvent$$, $userData$jscomp$20$$) && $e$jscomp$53$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$19$$});
}, $registerPointerlockChangeEventCallback$$ = ($target$jscomp$150$$, $userData$jscomp$22$$, $useCapture$jscomp$21$$, $callbackfunc$jscomp$22$$) => {
  $JSEvents$$.$pointerlockChangeEvent$ || ($JSEvents$$.$pointerlockChangeEvent$ = $_malloc$$(257));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$150$$, $eventTypeString$:"pointerlockchange", $callbackfunc$:$callbackfunc$jscomp$22$$, $handlerFunc$:($e$jscomp$54$$ = event) => {
    var $pointerlockChangeEvent$$ = $JSEvents$$.$pointerlockChangeEvent$, $pointerLockElement$jscomp$inline_484$$ = document.pointerLockElement;
    $HEAP8$$[$pointerlockChangeEvent$$ >>> 0] = !!$pointerLockElement$jscomp$inline_484$$;
    var $id$jscomp$inline_485$$ = $pointerLockElement$jscomp$inline_484$$?.id || "";
    $stringToUTF8$$($JSCompiler_StaticMethods_getNodeNameForTarget$$($pointerLockElement$jscomp$inline_484$$), $pointerlockChangeEvent$$ + 1, 128);
    $stringToUTF8$$($id$jscomp$inline_485$$, $pointerlockChangeEvent$$ + 129, 128);
    $dynCall_iiii$$($callbackfunc$jscomp$22$$, 20, $pointerlockChangeEvent$$, $userData$jscomp$22$$) && $e$jscomp$54$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$21$$});
}, $registerUiEventCallback$$ = ($target$jscomp$152$$, $userData$jscomp$24$$, $useCapture$jscomp$23$$, $callbackfunc$jscomp$24$$) => {
  $JSEvents$$.$uiEvent$ || ($JSEvents$$.$uiEvent$ = $_malloc$$(36));
  $target$jscomp$152$$ = $findEventTarget$$($target$jscomp$152$$);
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$152$$, $eventTypeString$:"resize", $callbackfunc$:$callbackfunc$jscomp$24$$, $handlerFunc$:($e$jscomp$55$$ = event) => {
    if ($e$jscomp$55$$.target == $target$jscomp$152$$) {
      var $b$jscomp$5$$ = document.body;
      if ($b$jscomp$5$$) {
        var $uiEvent$$ = $JSEvents$$.$uiEvent$;
        $HEAP32$$[$uiEvent$$ >>> 2 >>> 0] = 0;
        $HEAP32$$[$uiEvent$$ + 4 >>> 2 >>> 0] = $b$jscomp$5$$.clientWidth;
        $HEAP32$$[$uiEvent$$ + 8 >>> 2 >>> 0] = $b$jscomp$5$$.clientHeight;
        $HEAP32$$[$uiEvent$$ + 12 >>> 2 >>> 0] = innerWidth;
        $HEAP32$$[$uiEvent$$ + 16 >>> 2 >>> 0] = innerHeight;
        $HEAP32$$[$uiEvent$$ + 20 >>> 2 >>> 0] = outerWidth;
        $HEAP32$$[$uiEvent$$ + 24 >>> 2 >>> 0] = outerHeight;
        $HEAP32$$[$uiEvent$$ + 28 >>> 2 >>> 0] = pageXOffset | 0;
        $HEAP32$$[$uiEvent$$ + 32 >>> 2 >>> 0] = pageYOffset | 0;
        $dynCall_iiii$$($callbackfunc$jscomp$24$$, 10, $uiEvent$$, $userData$jscomp$24$$) && $e$jscomp$55$$.preventDefault();
      }
    }
  }, $useCapture$:$useCapture$jscomp$23$$});
}, $registerTouchEventCallback$$ = ($target$jscomp$154$$, $userData$jscomp$26$$, $useCapture$jscomp$25$$, $callbackfunc$jscomp$26$$, $eventTypeId$jscomp$9$$, $eventTypeString$jscomp$10$$) => {
  $JSEvents$$.$touchEvent$ || ($JSEvents$$.$touchEvent$ = $_malloc$$(1552));
  $target$jscomp$154$$ = $findEventTarget$$($target$jscomp$154$$);
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$154$$, $allowsDeferredCalls$:"touchstart" == $eventTypeString$jscomp$10$$ || "touchend" == $eventTypeString$jscomp$10$$, $eventTypeString$:$eventTypeString$jscomp$10$$, $callbackfunc$:$callbackfunc$jscomp$26$$, $handlerFunc$:$e$jscomp$56$$ => {
    $assert$$($e$jscomp$56$$);
    var $idx32_touches$jscomp$2$$ = {}, $et_touchEvent$$ = $e$jscomp$56$$.touches;
    for (var $idx$jscomp$7_t$jscomp$1$$ of $et_touchEvent$$) {
      $idx$jscomp$7_t$jscomp$1$$.$isChanged$ = $idx$jscomp$7_t$jscomp$1$$.$onTarget$ = 0, $idx32_touches$jscomp$2$$[$idx$jscomp$7_t$jscomp$1$$.identifier] = $idx$jscomp$7_t$jscomp$1$$;
    }
    for (var $t$jscomp$2_targetRect$$ of $e$jscomp$56$$.changedTouches) {
      $t$jscomp$2_targetRect$$.$isChanged$ = 1, $idx32_touches$jscomp$2$$[$t$jscomp$2_targetRect$$.identifier] = $t$jscomp$2_targetRect$$;
    }
    for (var $numTouches_t$jscomp$3$$ of $e$jscomp$56$$.targetTouches) {
      $idx32_touches$jscomp$2$$[$numTouches_t$jscomp$3$$.identifier].$onTarget$ = 1;
    }
    $et_touchEvent$$ = $JSEvents$$.$touchEvent$;
    $HEAPF64$$[$et_touchEvent$$ >>> 3 >>> 0] = $e$jscomp$56$$.timeStamp;
    $HEAP8$$[$et_touchEvent$$ + 12 >>> 0] = $e$jscomp$56$$.ctrlKey;
    $HEAP8$$[$et_touchEvent$$ + 13 >>> 0] = $e$jscomp$56$$.shiftKey;
    $HEAP8$$[$et_touchEvent$$ + 14 >>> 0] = $e$jscomp$56$$.altKey;
    $HEAP8$$[$et_touchEvent$$ + 15 >>> 0] = $e$jscomp$56$$.metaKey;
    $idx$jscomp$7_t$jscomp$1$$ = $et_touchEvent$$ + 16;
    $t$jscomp$2_targetRect$$ = $getBoundingClientRect$$($target$jscomp$154$$);
    $numTouches_t$jscomp$3$$ = 0;
    for (let $t$jscomp$4$$ of Object.values($idx32_touches$jscomp$2$$)) {
      if ($idx32_touches$jscomp$2$$ = $idx$jscomp$7_t$jscomp$1$$ >>> 2, $HEAP32$$[$idx32_touches$jscomp$2$$ >>> 0] = $t$jscomp$4$$.identifier, $HEAP32$$[$idx32_touches$jscomp$2$$ + 1 >>> 0] = $t$jscomp$4$$.screenX, $HEAP32$$[$idx32_touches$jscomp$2$$ + 2 >>> 0] = $t$jscomp$4$$.screenY, $HEAP32$$[$idx32_touches$jscomp$2$$ + 3 >>> 0] = $t$jscomp$4$$.clientX, $HEAP32$$[$idx32_touches$jscomp$2$$ + 4 >>> 0] = $t$jscomp$4$$.clientY, $HEAP32$$[$idx32_touches$jscomp$2$$ + 5 >>> 0] = $t$jscomp$4$$.pageX, 
      $HEAP32$$[$idx32_touches$jscomp$2$$ + 6 >>> 0] = $t$jscomp$4$$.pageY, $HEAP8$$[$idx$jscomp$7_t$jscomp$1$$ + 28 >>> 0] = $t$jscomp$4$$.$isChanged$, $HEAP8$$[$idx$jscomp$7_t$jscomp$1$$ + 29 >>> 0] = $t$jscomp$4$$.$onTarget$, $HEAP32$$[$idx32_touches$jscomp$2$$ + 8 >>> 0] = $t$jscomp$4$$.clientX - ($t$jscomp$2_targetRect$$.left | 0), $HEAP32$$[$idx32_touches$jscomp$2$$ + 9 >>> 0] = $t$jscomp$4$$.clientY - ($t$jscomp$2_targetRect$$.top | 0), $idx$jscomp$7_t$jscomp$1$$ += 48, 31 < ++$numTouches_t$jscomp$3$$) {
        break;
      }
    }
    $HEAP32$$[$et_touchEvent$$ + 8 >>> 2 >>> 0] = $numTouches_t$jscomp$3$$;
    $dynCall_iiii$$($callbackfunc$jscomp$26$$, $eventTypeId$jscomp$9$$, $et_touchEvent$$, $userData$jscomp$26$$) && $e$jscomp$56$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$25$$});
}, $registerVisibilityChangeEventCallback$$ = ($userData$jscomp$31$$, $useCapture$jscomp$30$$, $callbackfunc$jscomp$31$$) => {
  var $target$jscomp$159$$ = $specialHTMLTargets$$[1];
  $JSEvents$$.$visibilityChangeEvent$ || ($JSEvents$$.$visibilityChangeEvent$ = $_malloc$$(8));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$159$$, $eventTypeString$:"visibilitychange", $callbackfunc$:$callbackfunc$jscomp$31$$, $handlerFunc$:($e$jscomp$57$$ = event) => {
    var $visibilityChangeEvent$$ = $JSEvents$$.$visibilityChangeEvent$, $visibilityState$jscomp$inline_488$$ = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState);
    $HEAP8$$[$visibilityChangeEvent$$ >>> 0] = document.hidden;
    $HEAP32$$[$visibilityChangeEvent$$ + 4 >>> 2 >>> 0] = $visibilityState$jscomp$inline_488$$;
    $dynCall_iiii$$($callbackfunc$jscomp$31$$, 21, $visibilityChangeEvent$$, $userData$jscomp$31$$) && $e$jscomp$57$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$30$$});
}, $registerWheelEventCallback$$ = ($target$jscomp$160$$, $userData$jscomp$33$$, $useCapture$jscomp$32$$, $callbackfunc$jscomp$33$$) => {
  $JSEvents$$.$wheelEvent$ || ($JSEvents$$.$wheelEvent$ = $_malloc$$(96));
  return $JSCompiler_StaticMethods_registerOrRemoveHandler$$({target:$target$jscomp$160$$, $allowsDeferredCalls$:!0, $eventTypeString$:"wheel", $callbackfunc$:$callbackfunc$jscomp$33$$, $handlerFunc$:($e$jscomp$58$$ = event) => {
    var $wheelEvent$$ = $JSEvents$$.$wheelEvent$;
    $fillMouseEventData$$($wheelEvent$$, $e$jscomp$58$$, $target$jscomp$160$$);
    $HEAPF64$$[$wheelEvent$$ + 64 >>> 3 >>> 0] = $e$jscomp$58$$.deltaX;
    $HEAPF64$$[$wheelEvent$$ + 72 >>> 3 >>> 0] = $e$jscomp$58$$.deltaY;
    $HEAPF64$$[$wheelEvent$$ + 80 >>> 3 >>> 0] = $e$jscomp$58$$.deltaZ;
    $HEAP32$$[$wheelEvent$$ + 88 >>> 2 >>> 0] = $e$jscomp$58$$.deltaMode;
    $dynCall_iiii$$($callbackfunc$jscomp$33$$, 9, $wheelEvent$$, $userData$jscomp$33$$) && $e$jscomp$58$$.preventDefault();
  }, $useCapture$:$useCapture$jscomp$32$$});
}, $_emscripten_sleep$$ = $ms$$ => $Asyncify$handleSleep$$($wakeUp$$ => $safeSetTimeout$$($wakeUp$$, $ms$$));
$_emscripten_sleep$$.$isAsync$ = !0;
var $webglPowerPreferences$$ = ["default", "low-power", "high-performance"], $WebGPU$Internals$jsObjects$$ = [], $WebGPU$Internals$jsObjectInsert$$ = ($ptr$jscomp$15$$, $jsObject$$) => {
  $WebGPU$Internals$jsObjects$$[$ptr$jscomp$15$$ >>> 0] = $jsObject$$;
}, $WebGPU$Internals$futureInsert$$ = ($futureId$$, $promise$$) => {
  new Promise($resolve$jscomp$4$$ => $promise$$.finally(() => $resolve$jscomp$4$$($futureId$$)));
}, $WebGPU$getJsObject$$ = $ptr$jscomp$16$$ => {
  if ($ptr$jscomp$16$$) {
    return $ptr$jscomp$16$$ >>>= 0, $assert$$($ptr$jscomp$16$$ in $WebGPU$Internals$jsObjects$$), $WebGPU$Internals$jsObjects$$[$ptr$jscomp$16$$];
  }
}, $WebGPU$makeStringFromStringView$$ = $stringViewPtr$$ => $UTF8ToString$$($HEAPU32$$[$stringViewPtr$$ >>> 2 >>> 0], $HEAPU32$$[$stringViewPtr$$ + 4 >>> 2 >>> 0]), $WebGPU$makeStringFromOptionalStringView$$ = $length$jscomp$55_stringViewPtr$jscomp$1$$ => {
  var $ptr$jscomp$38$$ = $HEAPU32$$[$length$jscomp$55_stringViewPtr$jscomp$1$$ >>> 2 >>> 0];
  $length$jscomp$55_stringViewPtr$jscomp$1$$ = $HEAPU32$$[$length$jscomp$55_stringViewPtr$jscomp$1$$ + 4 >>> 2 >>> 0];
  if ($ptr$jscomp$38$$) {
    return $UTF8ToString$$($ptr$jscomp$38$$, $length$jscomp$55_stringViewPtr$jscomp$1$$);
  }
  if (0 === $length$jscomp$55_stringViewPtr$jscomp$1$$) {
    return "";
  }
}, $WebGPU$makeExtent3D$$ = $ptr$jscomp$40$$ => ({width:$HEAPU32$$[$ptr$jscomp$40$$ >>> 2 >>> 0], height:$HEAPU32$$[$ptr$jscomp$40$$ + 4 >>> 2 >>> 0], depthOrArrayLayers:$HEAPU32$$[$ptr$jscomp$40$$ + 8 >>> 2 >>> 0]}), $WebGPU$makePipelineConstants$$ = ($constantCount$$, $constantsPtr$$) => {
  if ($constantCount$$) {
    for (var $constants$$ = {}, $i$jscomp$56$$ = 0; $i$jscomp$56$$ < $constantCount$$; ++$i$jscomp$56$$) {
      var $entryPtr$$ = $constantsPtr$$ + 24 * $i$jscomp$56$$, $key$jscomp$43$$ = $WebGPU$makeStringFromStringView$$($entryPtr$$ + 4);
      $constants$$[$key$jscomp$43$$] = $HEAPF64$$[$entryPtr$$ + 16 >>> 3 >>> 0];
    }
    return $constants$$;
  }
}, $WebGPU$makePipelineLayout$$ = $layoutPtr$jscomp$1$$ => $layoutPtr$jscomp$1$$ ? $WebGPU$getJsObject$$($layoutPtr$jscomp$1$$) : "auto", $WebGPU$makeRenderPipelineDesc$$ = $descriptor$jscomp$2$$ => {
  function $makeBlendComponent$$($bdPtr$$) {
    if ($bdPtr$$) {
      return {operation:$WebGPU$BlendOperation$$[$HEAP32$$[$bdPtr$$ >>> 2 >>> 0]], srcFactor:$WebGPU$BlendFactor$$[$HEAP32$$[$bdPtr$$ + 4 >>> 2 >>> 0]], dstFactor:$WebGPU$BlendFactor$$[$HEAP32$$[$bdPtr$$ + 8 >>> 2 >>> 0]]};
    }
  }
  function $makeStencilStateFace$$($ssfPtr$$) {
    $assert$$($ssfPtr$$);
    return {compare:$WebGPU$CompareFunction$$[$HEAP32$$[$ssfPtr$$ >>> 2 >>> 0]], failOp:$WebGPU$StencilOperation$$[$HEAP32$$[$ssfPtr$$ + 4 >>> 2 >>> 0]], depthFailOp:$WebGPU$StencilOperation$$[$HEAP32$$[$ssfPtr$$ + 8 >>> 2 >>> 0]], passOp:$WebGPU$StencilOperation$$[$HEAP32$$[$ssfPtr$$ + 12 >>> 2 >>> 0]]};
  }
  $assert$$($descriptor$jscomp$2$$);
  $assert$$(0 === $HEAPU32$$[$descriptor$jscomp$2$$ >>> 2 >>> 0]);
  return {label:$WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$2$$ + 4), layout:$WebGPU$makePipelineLayout$$($HEAPU32$$[$descriptor$jscomp$2$$ + 12 >>> 2 >>> 0]), vertex:function($viPtr$$) {
    if ($viPtr$$) {
      $assert$$($viPtr$$);
      $assert$$(0 === $HEAPU32$$[$viPtr$$ >>> 2 >>> 0]);
      var $JSCompiler_temp_const$jscomp$43$$ = $WebGPU$getJsObject$$($HEAPU32$$[$viPtr$$ + 4 >>> 2 >>> 0]), $JSCompiler_temp_const$jscomp$42$$ = $WebGPU$makePipelineConstants$$($HEAPU32$$[$viPtr$$ + 16 >>> 2 >>> 0], $HEAPU32$$[$viPtr$$ + 20 >>> 2 >>> 0]);
      var $JSCompiler_inline_result$jscomp$44_count$jscomp$inline_191$$ = $HEAPU32$$[$viPtr$$ + 24 >>> 2 >>> 0];
      var $vbArrayPtr$jscomp$inline_192$$ = $HEAPU32$$[$viPtr$$ + 28 >>> 2 >>> 0];
      if ($JSCompiler_inline_result$jscomp$44_count$jscomp$inline_191$$) {
        for (var $vbs$jscomp$inline_193$$ = [], $i$jscomp$inline_194$$ = 0; $i$jscomp$inline_194$$ < $JSCompiler_inline_result$jscomp$44_count$jscomp$inline_191$$; ++$i$jscomp$inline_194$$) {
          var $JSCompiler_temp_const$jscomp$421$$ = $vbs$jscomp$inline_193$$, $JSCompiler_temp_const$jscomp$420$$ = $JSCompiler_temp_const$jscomp$421$$.push;
          var $vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ = $vbArrayPtr$jscomp$inline_192$$ + 24 * $i$jscomp$inline_194$$;
          if ($vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$) {
            var $JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$ = $WebGPU$VertexStepMode$$[$HEAP32$$[$vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ + 4 >>> 2 >>> 0]];
            var $attributeCount$jscomp$inline_492_count$jscomp$inline_572$$ = $HEAPU32$$[$vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ + 16 >>> 2 >>> 0];
            if ($JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$ || $attributeCount$jscomp$inline_492_count$jscomp$inline_572$$) {
              var $JSCompiler_temp_const$jscomp$568$$ = $readI53FromI64$$($vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ + 8);
              $vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ = $HEAPU32$$[$vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ + 20 >>> 2 >>> 0];
              for (var $vas$jscomp$inline_574$$ = [], $i$jscomp$inline_575$$ = 0; $i$jscomp$inline_575$$ < $attributeCount$jscomp$inline_492_count$jscomp$inline_572$$; ++$i$jscomp$inline_575$$) {
                var $JSCompiler_temp_const$jscomp$635$$ = $vas$jscomp$inline_574$$, $JSCompiler_temp_const$jscomp$634$$ = $JSCompiler_temp_const$jscomp$635$$.push, $vaPtr$jscomp$inline_637$$ = $vaArrayPtr$jscomp$inline_573_vbPtr$jscomp$inline_490$$ + 24 * $i$jscomp$inline_575$$;
                $assert$$($vaPtr$jscomp$inline_637$$);
                $JSCompiler_temp_const$jscomp$634$$.call($JSCompiler_temp_const$jscomp$635$$, {format:$WebGPU$VertexFormat$$[$HEAP32$$[$vaPtr$jscomp$inline_637$$ + 4 >>> 2 >>> 0]], offset:$readI53FromI64$$($vaPtr$jscomp$inline_637$$ + 8), shaderLocation:$HEAPU32$$[$vaPtr$jscomp$inline_637$$ + 16 >>> 2 >>> 0]});
              }
              $JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$ = {arrayStride:$JSCompiler_temp_const$jscomp$568$$, stepMode:$JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$, attributes:$vas$jscomp$inline_574$$};
            } else {
              $JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$ = null;
            }
          } else {
            $JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$ = void 0;
          }
          $JSCompiler_temp_const$jscomp$420$$.call($JSCompiler_temp_const$jscomp$421$$, $JSCompiler_inline_result$jscomp$422_JSCompiler_temp$jscomp$567_stepMode$jscomp$inline_491$$);
        }
        $JSCompiler_inline_result$jscomp$44_count$jscomp$inline_191$$ = $vbs$jscomp$inline_193$$;
      } else {
        $JSCompiler_inline_result$jscomp$44_count$jscomp$inline_191$$ = void 0;
      }
      return {module:$JSCompiler_temp_const$jscomp$43$$, constants:$JSCompiler_temp_const$jscomp$42$$, buffers:$JSCompiler_inline_result$jscomp$44_count$jscomp$inline_191$$, entryPoint:$WebGPU$makeStringFromOptionalStringView$$($viPtr$$ + 8)};
    }
  }($descriptor$jscomp$2$$ + 16), primitive:function($psPtr$$) {
    if ($psPtr$$) {
      return $assert$$($psPtr$$), $assert$$(0 === $HEAPU32$$[$psPtr$$ >>> 2 >>> 0]), {topology:$WebGPU$PrimitiveTopology$$[$HEAP32$$[$psPtr$$ + 4 >>> 2 >>> 0]], stripIndexFormat:$WebGPU$IndexFormat$$[$HEAP32$$[$psPtr$$ + 8 >>> 2 >>> 0]], frontFace:$WebGPU$FrontFace$$[$HEAP32$$[$psPtr$$ + 12 >>> 2 >>> 0]], cullMode:$WebGPU$CullMode$$[$HEAP32$$[$psPtr$$ + 16 >>> 2 >>> 0]], unclippedDepth:!!$HEAPU32$$[$psPtr$$ + 20 >>> 2 >>> 0]};
    }
  }($descriptor$jscomp$2$$ + 48), depthStencil:function($dssPtr$$) {
    if ($dssPtr$$) {
      return $assert$$($dssPtr$$), {format:$WebGPU$TextureFormat$$[$HEAP32$$[$dssPtr$$ + 4 >>> 2 >>> 0]], depthWriteEnabled:!!$HEAPU32$$[$dssPtr$$ + 8 >>> 2 >>> 0], depthCompare:$WebGPU$CompareFunction$$[$HEAP32$$[$dssPtr$$ + 12 >>> 2 >>> 0]], stencilFront:$makeStencilStateFace$$($dssPtr$$ + 16), stencilBack:$makeStencilStateFace$$($dssPtr$$ + 32), stencilReadMask:$HEAPU32$$[$dssPtr$$ + 48 >>> 2 >>> 0], stencilWriteMask:$HEAPU32$$[$dssPtr$$ + 52 >>> 2 >>> 0], depthBias:$HEAP32$$[$dssPtr$$ + 56 >>> 
      2 >>> 0], depthBiasSlopeScale:$HEAPF32$$[$dssPtr$$ + 60 >>> 2 >>> 0], depthBiasClamp:$HEAPF32$$[$dssPtr$$ + 64 >>> 2 >>> 0]};
    }
  }($HEAPU32$$[$descriptor$jscomp$2$$ + 72 >>> 2 >>> 0]), multisample:function($msPtr$$) {
    if ($msPtr$$) {
      return $assert$$($msPtr$$), $assert$$(0 === $HEAPU32$$[$msPtr$$ >>> 2 >>> 0]), {count:$HEAPU32$$[$msPtr$$ + 4 >>> 2 >>> 0], mask:$HEAPU32$$[$msPtr$$ + 8 >>> 2 >>> 0], alphaToCoverageEnabled:!!$HEAPU32$$[$msPtr$$ + 12 >>> 2 >>> 0]};
    }
  }($descriptor$jscomp$2$$ + 76), fragment:function($fsPtr$$) {
    if ($fsPtr$$) {
      $assert$$($fsPtr$$);
      $assert$$(0 === $HEAPU32$$[$fsPtr$$ >>> 2 >>> 0]);
      for (var $JSCompiler_temp_const$jscomp$40$$ = $WebGPU$getJsObject$$($HEAPU32$$[$fsPtr$$ + 4 >>> 2 >>> 0]), $JSCompiler_temp_const$jscomp$39$$ = $WebGPU$makePipelineConstants$$($HEAPU32$$[$fsPtr$$ + 16 >>> 2 >>> 0], $HEAPU32$$[$fsPtr$$ + 20 >>> 2 >>> 0]), $count$jscomp$inline_196$$ = $HEAPU32$$[$fsPtr$$ + 24 >>> 2 >>> 0], $csArrayPtr$jscomp$inline_197$$ = $HEAPU32$$[$fsPtr$$ + 28 >>> 2 >>> 0], $states$jscomp$inline_198$$ = [], $i$jscomp$inline_199$$ = 0; $i$jscomp$inline_199$$ < $count$jscomp$inline_196$$; ++$i$jscomp$inline_199$$) {
        var $JSCompiler_temp_const$jscomp$418$$ = $states$jscomp$inline_198$$, $JSCompiler_temp_const$jscomp$417$$ = $JSCompiler_temp_const$jscomp$418$$.push, $JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ = $csArrayPtr$jscomp$inline_197$$ + 24 * $i$jscomp$inline_199$$;
        $assert$$($JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$);
        $assert$$(0 === $HEAPU32$$[$JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ >>> 2 >>> 0]);
        var $format$jscomp$inline_495$$ = $WebGPU$TextureFormat$$[$HEAP32$$[$JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ + 4 >>> 2 >>> 0]];
        if ($format$jscomp$inline_495$$) {
          var $JSCompiler_inline_result$jscomp$566_bsPtr$jscomp$inline_577$$ = ($JSCompiler_inline_result$jscomp$566_bsPtr$jscomp$inline_577$$ = $HEAPU32$$[$JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ + 8 >>> 2 >>> 0]) ? {alpha:$makeBlendComponent$$($JSCompiler_inline_result$jscomp$566_bsPtr$jscomp$inline_577$$ + 12), color:$makeBlendComponent$$($JSCompiler_inline_result$jscomp$566_bsPtr$jscomp$inline_577$$ + 0)} : void 0;
          $JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ = {format:$format$jscomp$inline_495$$, blend:$JSCompiler_inline_result$jscomp$566_bsPtr$jscomp$inline_577$$, writeMask:$HEAPU32$$[$JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ + 16 >>> 2 >>> 0]};
        } else {
          $JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$ = void 0;
        }
        $JSCompiler_temp_const$jscomp$417$$.call($JSCompiler_temp_const$jscomp$418$$, $JSCompiler_temp$jscomp$565_csPtr$jscomp$inline_494$$);
      }
      return {module:$JSCompiler_temp_const$jscomp$40$$, constants:$JSCompiler_temp_const$jscomp$39$$, targets:$states$jscomp$inline_198$$, entryPoint:$WebGPU$makeStringFromOptionalStringView$$($fsPtr$$ + 8)};
    }
  }($HEAPU32$$[$descriptor$jscomp$2$$ + 92 >>> 2 >>> 0])};
}, $WebGPU$BlendFactor$$ = [, "zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1alpha", "one-minus-src1alpha"], $WebGPU$BlendOperation$$ = [, "add", "subtract", "reverse-subtract", "min", "max"], $WebGPU$BufferBindingType$$ = [, , "uniform", "storage", "read-only-storage"], $WebGPU$CompareFunction$$ = [, "never", "less", "equal", 
"less-equal", "greater", "not-equal", "greater-equal", "always"], $WebGPU$ComponentSwizzle$$ = [, "0", "1", "r", "g", "b", "a"], $WebGPU$CompositeAlphaMode$$ = [, "opaque", "premultiplied", "unpremultiplied", "inherit"], $WebGPU$CullMode$$ = [, "none", "front", "back"], $WebGPU$FeatureLevel$$ = [, "compatibility", "core"], $WebGPU$FeatureName$$ = {1:"core-features-and-limits", 2:"depth-clip-control", 3:"depth32float-stencil8", 4:"texture-compression-bc", 5:"texture-compression-bc-sliced-3d", 6:"texture-compression-etc2", 
7:"texture-compression-astc", 8:"texture-compression-astc-sliced-3d", 9:"timestamp-query", 10:"indirect-first-instance", 11:"shader-f16", 12:"rg11b10ufloat-renderable", 13:"bgra8unorm-storage", 14:"float32-filterable", 15:"float32-blendable", 16:"clip-distances", 17:"dual-source-blending", 18:"subgroups", 19:"texture-formats-tier1", 20:"texture-formats-tier2", 21:"primitive-index", 22:"texture-component-swizzle", 327692:"chromium-experimental-unorm16-texture-formats", 327693:"chromium-experimental-snorm16-texture-formats", 
327732:"chromium-experimental-multi-draw-indirect"}, $WebGPU$FrontFace$$ = [, "ccw", "cw"], $WebGPU$IndexFormat$$ = [, "uint16", "uint32"], $WebGPU$LoadOp$$ = [, "load", "clear"], $WebGPU$PowerPreference$$ = [, "low-power", "high-performance"], $WebGPU$PredefinedColorSpace$$ = [, "srgb", "display-p3"], $WebGPU$PrimitiveTopology$$ = [, "point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"], $WebGPU$SamplerBindingType$$ = [, , "filtering", "non-filtering", "comparison"], $WebGPU$StencilOperation$$ = 
[, "keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"], $WebGPU$StorageTextureAccess$$ = [, , "write-only", "read-only", "read-write"], $WebGPU$StoreOp$$ = [, "store", "discard"], $WebGPU$TextureAspect$$ = [, "all", "stencil-only", "depth-only"], $WebGPU$TextureDimension$$ = [, "1d", "2d", "3d"], $WebGPU$TextureFormat$$ = [, "r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", 
"rg8uint", "rg8sint", "r32float", "r32uint", "r32sint", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rgb9e5ufloat", "rg32float", "rg32uint", "rg32sint", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32float", "rgba32uint", "rgba32sint", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", 
"depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", 
"astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", 
"astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"], $WebGPU$TextureSampleType$$ = [, , "float", "unfilterable-float", "depth", "sint", "uint"], $WebGPU$TextureViewDimension$$ = [, "1d", "2d", "2d-array", "cube", "cube-array", "3d"], $WebGPU$ToneMappingMode$$ = [, "standard", "extended"], $WebGPU$VertexFormat$$ = [, "uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", 
"sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"], $WebGPU$VertexStepMode$$ = [, "vertex", "instance"], $emwgpuStringToInt_DeviceLostReason$$ = {undefined:1, unknown:1, destroyed:2}, $emwgpuStringToInt_PreferredFormat$$ = {rgba8unorm:22, 
bgra8unorm:27}, $ENV$$ = {}, $getEnvStrings$$ = () => {
  if (!$getEnvStrings$strings$$) {
    var $env$jscomp$1$$ = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.language || "C").replace("-", "_") + ".UTF-8", _:$thisProgram$$ || "./this.program"}, $x$jscomp$96$$;
    for ($x$jscomp$96$$ in $ENV$$) {
      void 0 === $ENV$$[$x$jscomp$96$$] ? delete $env$jscomp$1$$[$x$jscomp$96$$] : $env$jscomp$1$$[$x$jscomp$96$$] = $ENV$$[$x$jscomp$96$$];
    }
    var $strings$$ = [];
    for ($x$jscomp$96$$ in $env$jscomp$1$$) {
      $strings$$.push(`${$x$jscomp$96$$}=${$env$jscomp$1$$[$x$jscomp$96$$]}`);
    }
    $getEnvStrings$strings$$ = $strings$$;
  }
  return $getEnvStrings$strings$$;
}, $getEnvStrings$strings$$, $autoResumeAudioContext$$ = $ctx$jscomp$12$$ => {
  var $elements$$;
  $elements$$ ||= [document, document.getElementById("canvas")];
  ["keydown", "mousedown", "touchstart"].forEach($event$jscomp$24$$ => {
    $elements$$.forEach($element$jscomp$9$$ => {
      $element$jscomp$9$$?.addEventListener($event$jscomp$24$$, () => {
        "suspended" === $ctx$jscomp$12$$.state && $ctx$jscomp$12$$.resume();
      }, {once:!0});
    });
  });
}, $runAndAbortIfError$$ = $func$jscomp$19$$ => {
  try {
    $func$jscomp$19$$();
  } catch ($e$jscomp$64$$) {
    $abort$$($e$jscomp$64$$);
  }
};
function $Asyncify$instrumentWasmImports$$() {
  var $imports$jscomp$2$$ = $wasmImports$$, $importPattern$$ = /^(invoke_.*|__asyncjs__.*)$/;
  for (let [$x$jscomp$97$$, $original$$] of Object.entries($imports$jscomp$2$$)) {
    if ("function" == typeof $original$$) {
      let $isAsyncifyImport$$ = $original$$.$isAsync$ || $importPattern$$.test($x$jscomp$97$$);
      $imports$jscomp$2$$[$x$jscomp$97$$] = (...$args$jscomp$118_changedToDisabled$$) => {
        var $originalAsyncifyState$$ = $Asyncify$state$$;
        try {
          return $original$$(...$args$jscomp$118_changedToDisabled$$);
        } finally {
          $args$jscomp$118_changedToDisabled$$ = $originalAsyncifyState$$ === $Asyncify$State$Normal$$ && $Asyncify$state$$ === $Asyncify$State$Disabled$$;
          var $ignoredInvoke$$ = $x$jscomp$97$$.startsWith("invoke_") && !0;
          if ($Asyncify$state$$ !== $originalAsyncifyState$$ && !$isAsyncifyImport$$ && !$args$jscomp$118_changedToDisabled$$ && !$ignoredInvoke$$) {
            throw Error(`import ${$x$jscomp$97$$} was not in ASYNCIFY_IMPORTS, but changed the state`);
          }
        }
      };
    }
  }
}
function $Asyncify$instrumentFunction$$($original$jscomp$1$$) {
  var $wrapper$jscomp$1$$ = (...$args$jscomp$119_top$jscomp$3$$) => {
    $Asyncify$exportCallStack$$.push($original$jscomp$1$$);
    try {
      return $original$jscomp$1$$(...$args$jscomp$119_top$jscomp$3$$);
    } finally {
      $ABORT$$ || ($args$jscomp$119_top$jscomp$3$$ = $Asyncify$exportCallStack$$.pop(), $assert$$($args$jscomp$119_top$jscomp$3$$ === $original$jscomp$1$$), $Asyncify$currData$$ && 1 === $Asyncify$state$$ && 0 === $Asyncify$exportCallStack$$.length && ($Asyncify$state$$ = $Asyncify$State$Normal$$, $runAndAbortIfError$$($_asyncify_stop_unwind$$), "undefined" != typeof Fibers && Fibers.$trampoline$()));
    }
  };
  $Asyncify$funcWrappers$$.set($original$jscomp$1$$, $wrapper$jscomp$1$$);
  return $wrapper$jscomp$1$$;
}
var $Asyncify$State$Normal$$ = 0, $Asyncify$State$Disabled$$ = 3, $Asyncify$state$$ = 0, $Asyncify$currData$$ = null, $Asyncify$handleSleepReturnValue$$ = 0, $Asyncify$exportCallStack$$ = [], $Asyncify$callstackFuncToId$$ = new Map(), $Asyncify$callStackIdToFunc$$ = new Map(), $Asyncify$funcWrappers$$ = new Map(), $Asyncify$callStackId$$ = 0, $Asyncify$asyncPromiseHandlers$$ = null, $Asyncify$sleepCallbacks$$ = [];
function $Asyncify$allocateData$$() {
  var $ptr$jscomp$63$$ = $_malloc$$(4108), $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$ = $ptr$jscomp$63$$ + 12;
  $HEAPU32$$[$ptr$jscomp$63$$ >>> 2 >>> 0] = $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$;
  $HEAPU32$$[$ptr$jscomp$63$$ + 4 >>> 2 >>> 0] = $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$ + 4096;
  $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$ = $Asyncify$exportCallStack$$[0];
  $assert$$($bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$, "exportCallStack is empty");
  $assert$$($bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$);
  if (!$Asyncify$callstackFuncToId$$.has($bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$)) {
    var $id$jscomp$inline_498$$ = $Asyncify$callStackId$$++;
    $Asyncify$callstackFuncToId$$.set($bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$, $id$jscomp$inline_498$$);
    $Asyncify$callStackIdToFunc$$.set($id$jscomp$inline_498$$, $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$);
  }
  $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$ = $Asyncify$callstackFuncToId$$.get($bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$);
  $HEAP32$$[$ptr$jscomp$63$$ + 8 >>> 2 >>> 0] = $bottomOfCallStack$jscomp$inline_207_rewindId$jscomp$inline_208_stack$jscomp$inline_203$$;
  return $ptr$jscomp$63$$;
}
function $Asyncify$doRewind$$() {
  var $func$jscomp$22_id$jscomp$inline_211$$ = $HEAP32$$[$Asyncify$currData$$ + 8 >>> 2 >>> 0], $func$jscomp$inline_212$$ = $Asyncify$callStackIdToFunc$$.get($func$jscomp$22_id$jscomp$inline_211$$);
  $assert$$($func$jscomp$inline_212$$, `id ${$func$jscomp$22_id$jscomp$inline_211$$} not found in callStackIdToFunc`);
  $func$jscomp$22_id$jscomp$inline_211$$ = $Asyncify$funcWrappers$$.get($func$jscomp$inline_212$$);
  $assert$$($func$jscomp$inline_212$$);
  $assert$$($func$jscomp$22_id$jscomp$inline_211$$);
  return $func$jscomp$22_id$jscomp$inline_211$$();
}
function $Asyncify$handleSleep$$($startAsync$$) {
  $assert$$($Asyncify$state$$ !== $Asyncify$State$Disabled$$, "Asyncify cannot be done during or after the runtime exits");
  if (!$ABORT$$) {
    if ($Asyncify$state$$ === $Asyncify$State$Normal$$) {
      var $reachedCallback$$ = !1, $reachedAfterCallback$$ = !1;
      $startAsync$$(($handleSleepReturnValue_isError$$ = 0) => {
        $assert$$(!$handleSleepReturnValue_isError$$ || "number" == typeof $handleSleepReturnValue_isError$$ || "boolean" == typeof $handleSleepReturnValue_isError$$);
        if (!$ABORT$$ && ($Asyncify$handleSleepReturnValue$$ = $handleSleepReturnValue_isError$$, $reachedCallback$$ = !0, $reachedAfterCallback$$)) {
          $assert$$(!$Asyncify$exportCallStack$$.length, "Waking up (starting to rewind) must be done from JS, without compiled code on the stack.");
          $Asyncify$state$$ = 2;
          $runAndAbortIfError$$(() => $_asyncify_start_rewind$$($Asyncify$currData$$));
          "undefined" != typeof $MainLoop$$ && $MainLoop$func$$ && $MainLoop$resume$$();
          $handleSleepReturnValue_isError$$ = !1;
          try {
            var $asyncWasmReturnValue$$ = $Asyncify$doRewind$$();
          } catch ($err$jscomp$5$$) {
            $asyncWasmReturnValue$$ = $err$jscomp$5$$, $handleSleepReturnValue_isError$$ = !0;
          }
          var $handled$$ = !1;
          if (!$Asyncify$currData$$) {
            var $asyncPromiseHandlers$$ = $Asyncify$asyncPromiseHandlers$$;
            $asyncPromiseHandlers$$ && ($Asyncify$asyncPromiseHandlers$$ = null, ($handleSleepReturnValue_isError$$ ? $asyncPromiseHandlers$$.reject : $asyncPromiseHandlers$$.resolve)($asyncWasmReturnValue$$), $handled$$ = !0);
          }
          if ($handleSleepReturnValue_isError$$ && !$handled$$) {
            throw $asyncWasmReturnValue$$;
          }
        }
      });
      $reachedAfterCallback$$ = !0;
      $reachedCallback$$ || ($Asyncify$state$$ = 1, $Asyncify$currData$$ = $Asyncify$allocateData$$(), "undefined" != typeof $MainLoop$$ && $MainLoop$func$$ && $MainLoop$pause$$(), $runAndAbortIfError$$(() => $_asyncify_start_unwind$$($Asyncify$currData$$)));
    } else {
      2 === $Asyncify$state$$ ? ($Asyncify$state$$ = $Asyncify$State$Normal$$, $runAndAbortIfError$$($_asyncify_stop_rewind$$), $_free$$($Asyncify$currData$$), $Asyncify$currData$$ = null, $Asyncify$sleepCallbacks$$.forEach($callUserCallback$$)) : $abort$$(`invalid state: ${$Asyncify$state$$}`);
    }
    return $Asyncify$handleSleepReturnValue$$;
  }
}
$FS$nameTable$$ = Array(4096);
$FS$mount$$($MEMFS$$, "/");
$FS$mkdir$$("/tmp");
$FS$mkdir$$("/home");
$FS$mkdir$$("/home/web_user");
(function() {
  $FS$mkdir$$("/dev");
  $FS$registerDevice$$(259, {read:() => 0, write:($stream$jscomp$40$$, $buffer$jscomp$35$$, $offset$jscomp$77$$, $length$jscomp$38$$) => $length$jscomp$38$$, $llseek$:() => 0});
  $FS$mkdev$$("/dev/null", 259);
  $TTY$register$$(1280, $TTY$default_tty_ops$$);
  $TTY$register$$(1536, $TTY$default_tty1_ops$$);
  $FS$mkdev$$("/dev/tty", 1280);
  $FS$mkdev$$("/dev/tty1", 1536);
  var $randomBuffer$$ = new Uint8Array(1024), $randomLeft$$ = 0, $randomByte$$ = () => {
    0 === $randomLeft$$ && ($randomFill$$($randomBuffer$$), $randomLeft$$ = $randomBuffer$$.byteLength);
    return $randomBuffer$$[--$randomLeft$$];
  };
  $FS$createDevice$$("/dev", "random", $randomByte$$);
  $FS$createDevice$$("/dev", "urandom", $randomByte$$);
  $FS$mkdir$$("/dev/shm");
  $FS$mkdir$$("/dev/shm/tmp");
})();
(function() {
  $FS$mkdir$$("/proc");
  var $proc_self$$ = $FS$mkdir$$("/proc/self");
  $FS$mkdir$$("/proc/self/fd");
  $FS$mount$$({$mount$() {
    var $node$jscomp$45$$ = $FS$createNode$$($proc_self$$, "fd", 16895, 73);
    $node$jscomp$45$$.$stream_ops$ = {$llseek$:$MEMFS$$.$stream_ops$.$llseek$};
    $node$jscomp$45$$.$node_ops$ = {lookup($fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$, $name$jscomp$100$$) {
      $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$ = +$name$jscomp$100$$;
      var $stream$jscomp$41$$ = $FS$getStreamChecked$$($fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$);
      $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$ = {parent:null, $mount$:{$mountpoint$:"fake"}, $node_ops$:{readlink:() => $stream$jscomp$41$$.path}, id:$fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$ + 1};
      return $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$.parent = $fd$jscomp$31_parent$jscomp$20_ret$jscomp$3$$;
    }, readdir() {
      return Array.from($FS$streams$$.entries()).filter(([, $v$jscomp$1$$]) => $v$jscomp$1$$).map(([$k$jscomp$1$$]) => $k$jscomp$1$$.toString());
    }};
    return $node$jscomp$45$$;
  }}, "/proc/self/fd");
})();
$Module$$.requestAnimationFrame = $MainLoop$requestAnimationFrame$$;
$Module$$.pauseMainLoop = $MainLoop$pause$$;
$Module$$.resumeMainLoop = $MainLoop$resume$$;
$Module$$.preMainLoop && $MainLoop$preMainLoop$$.push($Module$$.preMainLoop);
$Module$$.postMainLoop && $MainLoop$postMainLoop$$.push($Module$$.postMainLoop);
for (let $i$jscomp$66$$ = 0; 32 > $i$jscomp$66$$; ++$i$jscomp$66$$) {
  $tempFixedLengthArray$$.push(Array($i$jscomp$66$$));
}
for (var $miniTempWebGLFloatBuffersStorage$$ = new Float32Array(288), $i$$ = 0; 288 >= $i$$; ++$i$$) {
  $miniTempWebGLFloatBuffers$$[$i$$] = $miniTempWebGLFloatBuffersStorage$$.subarray(0, $i$$);
}
var $miniTempWebGLIntBuffersStorage$$ = new Int32Array(288);
for ($i$$ = 0; 288 >= $i$$; ++$i$$) {
  $miniTempWebGLIntBuffers$$[$i$$] = $miniTempWebGLIntBuffersStorage$$.subarray(0, $i$$);
}
$Module$$.noExitRuntime && ($noExitRuntime$$ = $Module$$.noExitRuntime);
$Module$$.preloadPlugins && ($preloadPlugins$$ = $Module$$.preloadPlugins);
$Module$$.print && ($out$$ = $Module$$.print);
$Module$$.printErr && ($err$$ = $Module$$.printErr);
$Module$$.wasmBinary && ($wasmBinary$$ = $Module$$.wasmBinary);
Object.getOwnPropertyDescriptor($Module$$, "fetchSettings") && $abort$$("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
$Module$$.arguments && ($arguments_$$ = $Module$$.arguments);
$Module$$.thisProgram && ($thisProgram$$ = $Module$$.thisProgram);
$assert$$("undefined" == typeof $Module$$.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
$assert$$("undefined" == typeof $Module$$.read, "Module.read option was removed");
$assert$$("undefined" == typeof $Module$$.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
$assert$$("undefined" == typeof $Module$$.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
$assert$$("undefined" == typeof $Module$$.setWindowTitle, "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
$assert$$("undefined" == typeof $Module$$.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
$assert$$("undefined" == typeof $Module$$.ENVIRONMENT, "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
$assert$$("undefined" == typeof $Module$$.STACK_SIZE, "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
$assert$$("undefined" == typeof $Module$$.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
$assert$$("undefined" == typeof $Module$$.INITIAL_MEMORY, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
if ($Module$$.preInit) {
  for ("function" == typeof $Module$$.preInit && ($Module$$.preInit = [$Module$$.preInit]); 0 < $Module$$.preInit.length;) {
    $Module$$.preInit.shift()();
  }
}
$consumedModuleProp$$("preInit");
$Module$$.addRunDependency = $addRunDependency$$;
$Module$$.removeRunDependency = $removeRunDependency$$;
$Module$$.createContext = $Browser$createContext$$;
$Module$$.FS_preloadFile = async($parent$jscomp$10$$, $name$jscomp$88$$, $url$jscomp$29$$, $canRead$jscomp$1$$, $canWrite$jscomp$1$$, $dontCreateFile$$, $canOwn$jscomp$1$$, $preFinish$$) => {
  var $fullname$jscomp$1$$ = $name$jscomp$88$$ ? $PATH_FS$resolve$$($PATH$normalize$$($parent$jscomp$10$$ + "/" + $name$jscomp$88$$)) : $parent$jscomp$10$$, $dep$jscomp$1_id$jscomp$inline_217$$;
  a: {
    for (var $byteArray$jscomp$1_orig$jscomp$inline_218$$ = $dep$jscomp$1_id$jscomp$inline_217$$ = `cp ${$fullname$jscomp$1$$}`;;) {
      if (!$runDependencyTracking$$[$dep$jscomp$1_id$jscomp$inline_217$$]) {
        break a;
      }
      $dep$jscomp$1_id$jscomp$inline_217$$ = $byteArray$jscomp$1_orig$jscomp$inline_218$$ + Math.random();
    }
  }
  $addRunDependency$$($dep$jscomp$1_id$jscomp$inline_217$$);
  try {
    $byteArray$jscomp$1_orig$jscomp$inline_218$$ = $url$jscomp$29$$, "string" == typeof $url$jscomp$29$$ && ($byteArray$jscomp$1_orig$jscomp$inline_218$$ = await $asyncLoad$$($url$jscomp$29$$)), $byteArray$jscomp$1_orig$jscomp$inline_218$$ = await $FS_handledByPreloadPlugin$$($byteArray$jscomp$1_orig$jscomp$inline_218$$, $fullname$jscomp$1$$), $preFinish$$?.(), $dontCreateFile$$ || $FS$createDataFile$$($parent$jscomp$10$$, $name$jscomp$88$$, $byteArray$jscomp$1_orig$jscomp$inline_218$$, $canRead$jscomp$1$$, 
    $canWrite$jscomp$1$$, $canOwn$jscomp$1$$);
  } finally {
    $removeRunDependency$$($dep$jscomp$1_id$jscomp$inline_217$$);
  }
};
$Module$$.FS_unlink = (...$args$jscomp$121$$) => $FS$unlink$$(...$args$jscomp$121$$);
$Module$$.FS_createPath = (...$args$jscomp$120$$) => $FS$createPath$$(...$args$jscomp$120$$);
$Module$$.FS_createDevice = (...$args$jscomp$123$$) => $FS$createDevice$$(...$args$jscomp$123$$);
$Module$$.FS_createDataFile = (...$args$jscomp$115$$) => $FS$createDataFile$$(...$args$jscomp$115$$);
$Module$$.FS_createLazyFile = (...$args$jscomp$122$$) => $FS$createLazyFile$$(...$args$jscomp$122$$);
"writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 getTempRet0 setTempRet0 zeroMemory withStackSave inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr runEmAsmFunction getDynCaller asmjsMangle HandleAllocator getNativeTypeSize addOnInit addOnPostCtor addOnPreMain STACK_SIZE STACK_ALIGN POINTER_SIZE ASSERTIONS ccall cwrap convertJsFunctionToWasm getEmptyTableSlot updateTableMap getFunctionAddress addFunction removeFunction intArrayToString AsciiToString stringToAscii UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback hideEverythingExceptGivenElement restoreHiddenElements softFullscreenResizeWebGLRenderTarget registerPointerlockErrorEventCallback fillBatteryEventData registerBatteryEventCallback jsStackTrace getCallstack convertPCtoSourceLocation wasiRightsToMuslOFlags wasiOFlagsToMuslOFlags setImmediateWrapped safeRequestAnimationFrame clearImmediateWrapped registerPostMainLoop registerPreMainLoop getPromise makePromise idsToPromises makePromiseCallback findMatchingCatch Browser_asyncPrepareDataCounter arraySum addDays getSocketFromFD getSocketAddress FS_mkdirTree _setNetworkCallback writeGLArray registerWebGlEventCallback ALLOC_NORMAL ALLOC_STACK allocate writeStringToMemory writeAsciiToMemory demangle stackTrace".split(" ").forEach(function($sym$jscomp$4$$) {
  $hookGlobalSymbolAccess$$($sym$jscomp$4$$, () => {
    var $msg$jscomp$1$$ = `\`${$sym$jscomp$4$$}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, $librarySymbol$$ = $sym$jscomp$4$$;
    $librarySymbol$$.startsWith("_") || ($librarySymbol$$ = "$" + $sym$jscomp$4$$);
    $msg$jscomp$1$$ += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${$librarySymbol$$}')`;
    $isExportedByForceFilesystem$$($sym$jscomp$4$$) && ($msg$jscomp$1$$ += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    $warnOnce$$($msg$jscomp$1$$);
  });
  $unexportedRuntimeSymbol$$($sym$jscomp$4$$);
});
"run out err callMain abort wasmMemory wasmExports HEAPF32 HEAPF64 HEAP8 HEAPU8 HEAP16 HEAPU16 HEAP32 HEAPU32 HEAP64 HEAPU64 writeStackCookie checkStackCookie writeI53ToI64 readI53FromI64 readI53FromU64 INT53_MAX INT53_MIN bigintToI53Checked stackSave stackRestore stackAlloc ptrToString exitJS getHeapMax growMemory ENV ERRNO_CODES strError DNS Protocols Sockets timers warnOnce readEmAsmArgsArray readEmAsmArgs runMainThreadEmAsm jstoi_q getExecutableName autoResumeAudioContext dynCallLegacy dynCall handleException keepRuntimeAlive runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit asyncLoad alignMemory mmapAlloc wasmTable getUniqueRunDependency noExitRuntime addOnPreRun addOnExit addOnPostRun freeTableIndexes functionsInTableMap setValue getValue PATH PATH_FS UTF8Decoder UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 intArrayFromString UTF16Decoder stringToNewUTF8 stringToUTF8OnStack writeArrayToMemory JSEvents registerKeyEventCallback specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle setLetterbox currentFullscreenStrategy restoreOldWindowedStyle doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback setCanvasElementSize getCanvasElementSize UNWIND_CACHE ExitStatus getEnvStrings checkWasiClock doReadv doWritev initRandomFill randomFill safeSetTimeout emSetImmediate emClearImmediate_deps emClearImmediate promiseMap uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo Browser requestFullScreen setCanvasSize getUserMedia getPreloadedImageData__data wget MONTH_DAYS_REGULAR MONTH_DAYS_LEAP MONTH_DAYS_REGULAR_CUMULATIVE MONTH_DAYS_LEAP_CUMULATIVE isLeapYear ydayFromDate SYSCALLS preloadPlugins FS_createPreloadedFile FS_modeStringToFlags FS_getMode FS_stdin_getChar_buffer FS_stdin_getChar FS_readFile FS FS_root FS_mounts FS_devices FS_streams FS_nextInode FS_nameTable FS_currentPath FS_initialized FS_ignorePermissions FS_filesystems FS_syncFSRequests FS_readFiles FS_lookupPath FS_getPath FS_hashName FS_hashAddNode FS_hashRemoveNode FS_lookupNode FS_createNode FS_destroyNode FS_isRoot FS_isMountpoint FS_isFile FS_isDir FS_isLink FS_isChrdev FS_isBlkdev FS_isFIFO FS_isSocket FS_flagsToPermissionString FS_nodePermissions FS_mayLookup FS_mayCreate FS_mayDelete FS_mayOpen FS_checkOpExists FS_nextfd FS_getStreamChecked FS_getStream FS_createStream FS_closeStream FS_dupStream FS_doSetAttr FS_chrdev_stream_ops FS_major FS_minor FS_makedev FS_registerDevice FS_getDevice FS_getMounts FS_syncfs FS_mount FS_unmount FS_lookup FS_mknod FS_statfs FS_statfsStream FS_statfsNode FS_create FS_mkdir FS_mkdev FS_symlink FS_rename FS_rmdir FS_readdir FS_readlink FS_stat FS_fstat FS_lstat FS_doChmod FS_chmod FS_lchmod FS_fchmod FS_doChown FS_chown FS_lchown FS_fchown FS_doTruncate FS_truncate FS_ftruncate FS_utime FS_open FS_close FS_isClosed FS_llseek FS_read FS_write FS_mmap FS_msync FS_ioctl FS_writeFile FS_cwd FS_chdir FS_createDefaultDirectories FS_createDefaultDevices FS_createSpecialDirectories FS_createStandardStreams FS_staticInit FS_init FS_quit FS_findObject FS_analyzePath FS_createFile FS_forceLoadFile FS_absolutePath FS_createFolder FS_createLink FS_joinPath FS_mmapAlloc FS_standardizePath MEMFS TTY PIPEFS SOCKFS tempFixedLengthArray miniTempWebGLFloatBuffers miniTempWebGLIntBuffers heapObjectForWebGLType toTypedArrayIndex webgl_enable_ANGLE_instanced_arrays webgl_enable_OES_vertex_array_object webgl_enable_WEBGL_draw_buffers webgl_enable_WEBGL_multi_draw webgl_enable_EXT_polygon_offset_clamp webgl_enable_EXT_clip_control webgl_enable_WEBGL_polygon_mode GL emscriptenWebGLGet computeUnpackAlignedImageSize colorChannelsInGlTextureFormat emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib __glGetActiveAttribOrUniform AL GLUT EGL GLEW IDBStore runAndAbortIfError Asyncify Fibers SDL SDL_gfx allocateUTF8 allocateUTF8OnStack print printErr jstoi_s WebGPU emwgpuStringToInt_BufferMapState emwgpuStringToInt_CompilationMessageType emwgpuStringToInt_DeviceLostReason emwgpuStringToInt_FeatureName emwgpuStringToInt_PreferredFormat".split(" ").forEach($unexportedRuntimeSymbol$$);
$Module$$.requestFullscreen = function($lockPointer$$, $resizeCanvas$$) {
  function $fullscreenChange$$() {
    $Browser$isFullscreen$$ = !1;
    var $canvasContainer$jscomp$1$$ = $canvas$jscomp$7$$.parentNode;
    $getFullscreenElement$$() === $canvasContainer$jscomp$1$$ ? ($canvas$jscomp$7$$.exitFullscreen = $Browser$exitFullscreen$$, $Browser$lockPointer$$ && $canvas$jscomp$7$$.requestPointerLock(), $Browser$isFullscreen$$ = !0, $Browser$resizeCanvas$$ ? ("undefined" != typeof SDL && ($HEAP32$$[SDL.screen >>> 2 >>> 0] = $HEAPU32$$[SDL.screen >>> 2 >>> 0] | 8388608), $Browser$updateCanvasDimensions$$($Module$$.canvas), $Browser$updateResizeListeners$$()) : $Browser$updateCanvasDimensions$$($canvas$jscomp$7$$)) : 
    ($canvasContainer$jscomp$1$$.parentNode.insertBefore($canvas$jscomp$7$$, $canvasContainer$jscomp$1$$), $canvasContainer$jscomp$1$$.parentNode.removeChild($canvasContainer$jscomp$1$$), $Browser$resizeCanvas$$ ? ("undefined" != typeof SDL && ($HEAP32$$[SDL.screen >>> 2 >>> 0] = $HEAPU32$$[SDL.screen >>> 2 >>> 0] & -8388609), $Browser$updateCanvasDimensions$$($Module$$.canvas), $Browser$updateResizeListeners$$()) : $Browser$updateCanvasDimensions$$($canvas$jscomp$7$$));
    $Module$$.onFullScreen?.($Browser$isFullscreen$$);
    $Module$$.onFullscreen?.($Browser$isFullscreen$$);
  }
  $Browser$lockPointer$$ = $lockPointer$$;
  $Browser$resizeCanvas$$ = $resizeCanvas$$;
  "undefined" == typeof $Browser$lockPointer$$ && ($Browser$lockPointer$$ = !0);
  "undefined" == typeof $Browser$resizeCanvas$$ && ($Browser$resizeCanvas$$ = !1);
  var $canvas$jscomp$7$$ = $Module$$.canvas;
  $Browser$fullscreenHandlersInstalled$$ || ($Browser$fullscreenHandlersInstalled$$ = !0, document.addEventListener("fullscreenchange", $fullscreenChange$$, !1), document.addEventListener("mozfullscreenchange", $fullscreenChange$$, !1), document.addEventListener("webkitfullscreenchange", $fullscreenChange$$, !1), document.addEventListener("MSFullscreenChange", $fullscreenChange$$, !1));
  var $canvasContainer$$ = document.createElement("div");
  $canvas$jscomp$7$$.parentNode.insertBefore($canvasContainer$$, $canvas$jscomp$7$$);
  $canvasContainer$$.appendChild($canvas$jscomp$7$$);
  $canvasContainer$$.requestFullscreen = $canvasContainer$$.requestFullscreen || $canvasContainer$$.mozRequestFullScreen || $canvasContainer$$.msRequestFullscreen || ($canvasContainer$$.webkitRequestFullscreen ? () => $canvasContainer$$.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || ($canvasContainer$$.webkitRequestFullScreen ? () => $canvasContainer$$.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null);
  $canvasContainer$$.requestFullscreen();
};
var $ASM_CONSTS$$ = {1010380:$$0_reply_str$jscomp$17$$ => {
  $$0_reply_str$jscomp$17$$ = $UTF8ToString$$($$0_reply_str$jscomp$17$$) + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :";
  $$0_reply_str$jscomp$17$$ = window.prompt($$0_reply_str$jscomp$17$$, "i");
  null === $$0_reply_str$jscomp$17$$ && ($$0_reply_str$jscomp$17$$ = "i");
  return 1 === $$0_reply_str$jscomp$17$$.length ? $$0_reply_str$jscomp$17$$.charCodeAt(0) : -1;
}, 1010595:() => {
  "undefined" === typeof $Module$$.SDL3 && ($Module$$.SDL3 = {});
  $Module$$.SDL3.$dummy_audio$ = {};
  $Module$$.SDL3.$dummy_audio$.$timers$ = [];
  $Module$$.SDL3.$dummy_audio$.$timers$[0] = void 0;
  $Module$$.SDL3.$dummy_audio$.$timers$[1] = void 0;
}, 1010841:($$0$jscomp$1$$, $$1$$, $$2$$, $$3$$, $$4$$) => {
  var $a$jscomp$2$$ = $Module$$.SDL3.$dummy_audio$;
  void 0 !== $a$jscomp$2$$.$timers$[$$0$jscomp$1$$] && clearInterval($a$jscomp$2$$.$timers$[$$0$jscomp$1$$]);
  $a$jscomp$2$$.$timers$[$$0$jscomp$1$$] = setInterval(function() {
    $dynCall$$("vi", $$3$$, [$$4$$]);
  }, $$1$$ / $$2$$ * 1e3);
}, 1011033:$$0$jscomp$2$$ => {
  var $a$jscomp$3$$ = $Module$$.SDL3.$dummy_audio$;
  void 0 !== $a$jscomp$3$$.$timers$[$$0$jscomp$2$$] && clearInterval($a$jscomp$3$$.$timers$[$$0$jscomp$2$$]);
  $a$jscomp$3$$.$timers$[$$0$jscomp$2$$] = void 0;
}, 1011164:() => "undefined" !== typeof AudioContext || "undefined" !== typeof webkitAudioContext ? !0 : !1, 1011311:() => "undefined" !== typeof navigator.mediaDevices && "undefined" !== typeof navigator.mediaDevices.getUserMedia || "undefined" !== typeof navigator.webkitGetUserMedia ? !0 : !1, 1011545:$$0$jscomp$3$$ => {
  "undefined" === typeof $Module$$.SDL3 && ($Module$$.SDL3 = {});
  var $SDL3$$ = $Module$$.SDL3;
  $$0$jscomp$3$$ ? $SDL3$$.$audio_recording$ = {} : $SDL3$$.$audio_playback$ = {};
  $SDL3$$.$audioContext$ || ("undefined" !== typeof AudioContext ? $SDL3$$.$audioContext$ = new AudioContext() : "undefined" !== typeof webkitAudioContext && ($SDL3$$.$audioContext$ = new webkitAudioContext()), $SDL3$$.$audioContext$ && "undefined" === typeof navigator.userActivation && $autoResumeAudioContext$$($SDL3$$.$audioContext$));
  return void 0 !== $SDL3$$.$audioContext$;
}, 1012108:() => $Module$$.SDL3.$audioContext$.sampleRate, 1012159:($$0$jscomp$4$$, $$1$jscomp$1$$, $$2$jscomp$1$$, $$3$jscomp$1$$) => {
  function $no_microphone$$() {
  }
  function $have_microphone$$($stream$jscomp$64$$) {
    void 0 !== $SDL3$jscomp$1$$.$audio_recording$.$silenceTimer$ && (clearInterval($SDL3$jscomp$1$$.$audio_recording$.$silenceTimer$), $SDL3$jscomp$1$$.$audio_recording$.$silenceTimer$ = void 0, $SDL3$jscomp$1$$.$audio_recording$.$silenceBuffer$ = void 0);
    $SDL3$jscomp$1$$.$audio_recording$.$mediaStreamNode$ = $SDL3$jscomp$1$$.$audioContext$.createMediaStreamSource($stream$jscomp$64$$);
    $SDL3$jscomp$1$$.$audio_recording$.$scriptProcessorNode$ = $SDL3$jscomp$1$$.$audioContext$.createScriptProcessor($$1$jscomp$1$$, $$0$jscomp$4$$, 1);
    $SDL3$jscomp$1$$.$audio_recording$.$scriptProcessorNode$.onaudioprocess = function($audioProcessingEvent$$) {
      void 0 !== $SDL3$jscomp$1$$ && void 0 !== $SDL3$jscomp$1$$.$audio_recording$ && ($audioProcessingEvent$$.outputBuffer.getChannelData(0).fill(0), $SDL3$jscomp$1$$.$audio_recording$.$currentRecordingBuffer$ = $audioProcessingEvent$$.inputBuffer, $dynCall$$("ip", $$2$jscomp$1$$, [$$3$jscomp$1$$]));
    };
    $SDL3$jscomp$1$$.$audio_recording$.$mediaStreamNode$.connect($SDL3$jscomp$1$$.$audio_recording$.$scriptProcessorNode$);
    $SDL3$jscomp$1$$.$audio_recording$.$scriptProcessorNode$.connect($SDL3$jscomp$1$$.$audioContext$.destination);
    $SDL3$jscomp$1$$.$audio_recording$.stream = $stream$jscomp$64$$;
  }
  var $SDL3$jscomp$1$$ = $Module$$.SDL3;
  $SDL3$jscomp$1$$.$audio_recording$.$silenceBuffer$ = $SDL3$jscomp$1$$.$audioContext$.createBuffer($$0$jscomp$4$$, $$1$jscomp$1$$, $SDL3$jscomp$1$$.$audioContext$.sampleRate);
  $SDL3$jscomp$1$$.$audio_recording$.$silenceBuffer$.getChannelData(0).fill(0);
  $SDL3$jscomp$1$$.$audio_recording$.$silenceTimer$ = setInterval(function() {
    $SDL3$jscomp$1$$.$audio_recording$.$currentRecordingBuffer$ = $SDL3$jscomp$1$$.$audio_recording$.$silenceBuffer$;
    $dynCall$$("ip", $$2$jscomp$1$$, [$$3$jscomp$1$$]);
  }, $$1$jscomp$1$$ / $SDL3$jscomp$1$$.$audioContext$.sampleRate * 1e3);
  void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({audio:!0, video:!1}).then($have_microphone$$).catch($no_microphone$$) : void 0 !== navigator.webkitGetUserMedia && navigator.webkitGetUserMedia({audio:!0, video:!1}, $have_microphone$$, $no_microphone$$);
}, 1014E3:($$0$jscomp$5$$, $$1$jscomp$2$$, $$2$jscomp$2$$, $$3$jscomp$2$$) => {
  var $SDL3$jscomp$2$$ = $Module$$.SDL3;
  $SDL3$jscomp$2$$.$audio_playback$.$scriptProcessorNode$ = $SDL3$jscomp$2$$.$audioContext$.createScriptProcessor($$1$jscomp$2$$, 0, $$0$jscomp$5$$);
  $SDL3$jscomp$2$$.$audio_playback$.$scriptProcessorNode$.onaudioprocess = function($e$jscomp$65$$) {
    void 0 !== $SDL3$jscomp$2$$ && void 0 !== $SDL3$jscomp$2$$.$audio_playback$ && (void 0 !== $SDL3$jscomp$2$$.$audio_playback$.$silenceTimer$ && (clearInterval($SDL3$jscomp$2$$.$audio_playback$.$silenceTimer$), $SDL3$jscomp$2$$.$audio_playback$.$silenceTimer$ = void 0, $SDL3$jscomp$2$$.$audio_playback$.$silenceBuffer$ = void 0), $SDL3$jscomp$2$$.$audio_playback$.$currentPlaybackBuffer$ = $e$jscomp$65$$.outputBuffer, $dynCall$$("ip", $$2$jscomp$2$$, [$$3$jscomp$2$$]));
  };
  $SDL3$jscomp$2$$.$audio_playback$.$scriptProcessorNode$.connect($SDL3$jscomp$2$$.$audioContext$.destination);
  "suspended" === $SDL3$jscomp$2$$.$audioContext$.state && ($SDL3$jscomp$2$$.$audio_playback$.$silenceBuffer$ = $SDL3$jscomp$2$$.$audioContext$.createBuffer($$0$jscomp$5$$, $$1$jscomp$2$$, $SDL3$jscomp$2$$.$audioContext$.sampleRate), $SDL3$jscomp$2$$.$audio_playback$.$silenceBuffer$.getChannelData(0).fill(0), $SDL3$jscomp$2$$.$audio_playback$.$silenceTimer$ = setInterval(function() {
    "undefined" !== typeof navigator.userActivation && navigator.userActivation.hasBeenActive && $SDL3$jscomp$2$$.$audioContext$.resume();
    $SDL3$jscomp$2$$.$audio_playback$.$currentPlaybackBuffer$ = $SDL3$jscomp$2$$.$audio_playback$.$silenceBuffer$;
    $dynCall$$("ip", $$2$jscomp$2$$, [$$3$jscomp$2$$]);
    $SDL3$jscomp$2$$.$audio_playback$.$currentPlaybackBuffer$ = void 0;
  }, $$1$jscomp$2$$ / $SDL3$jscomp$2$$.$audioContext$.sampleRate * 1e3));
}, 1015316:$$0$jscomp$6_tracks$$ => {
  var $SDL3$jscomp$3$$ = $Module$$.SDL3;
  if ($$0$jscomp$6_tracks$$) {
    void 0 !== $SDL3$jscomp$3$$.$audio_recording$.$silenceTimer$ && clearInterval($SDL3$jscomp$3$$.$audio_recording$.$silenceTimer$);
    if (void 0 !== $SDL3$jscomp$3$$.$audio_recording$.stream) {
      $$0$jscomp$6_tracks$$ = $SDL3$jscomp$3$$.$audio_recording$.stream.getAudioTracks();
      for (var $i$jscomp$67$$ = 0; $i$jscomp$67$$ < $$0$jscomp$6_tracks$$.length; $i$jscomp$67$$++) {
        $SDL3$jscomp$3$$.$audio_recording$.stream.removeTrack($$0$jscomp$6_tracks$$[$i$jscomp$67$$]);
      }
    }
    void 0 !== $SDL3$jscomp$3$$.$audio_recording$.$scriptProcessorNode$ && ($SDL3$jscomp$3$$.$audio_recording$.$scriptProcessorNode$.onaudioprocess = function() {
    }, $SDL3$jscomp$3$$.$audio_recording$.$scriptProcessorNode$.disconnect());
    void 0 !== $SDL3$jscomp$3$$.$audio_recording$.$mediaStreamNode$ && $SDL3$jscomp$3$$.$audio_recording$.$mediaStreamNode$.disconnect();
    $SDL3$jscomp$3$$.$audio_recording$ = void 0;
  } else {
    void 0 != $SDL3$jscomp$3$$.$audio_playback$.$scriptProcessorNode$ && $SDL3$jscomp$3$$.$audio_playback$.$scriptProcessorNode$.disconnect(), void 0 !== $SDL3$jscomp$3$$.$audio_playback$.$silenceTimer$ && clearInterval($SDL3$jscomp$3$$.$audio_playback$.$silenceTimer$), $SDL3$jscomp$3$$.$audio_playback$ = void 0;
  }
  void 0 !== $SDL3$jscomp$3$$.$audioContext$ && void 0 === $SDL3$jscomp$3$$.$audio_playback$ && void 0 === $SDL3$jscomp$3$$.$audio_recording$ && ($SDL3$jscomp$3$$.$audioContext$.close(), $SDL3$jscomp$3$$.$audioContext$ = void 0);
}, 1016472:($$0$jscomp$7_buf$jscomp$18$$, $$1$jscomp$3$$) => {
  $$0$jscomp$7_buf$jscomp$18$$ >>>= 2;
  for (var $SDL3$jscomp$4$$ = $Module$$.SDL3, $numChannels$$ = $SDL3$jscomp$4$$.$audio_playback$.$currentPlaybackBuffer$.numberOfChannels, $c$jscomp$1$$ = 0; $c$jscomp$1$$ < $numChannels$$; ++$c$jscomp$1$$) {
    var $channelData$$ = $SDL3$jscomp$4$$.$audio_playback$.$currentPlaybackBuffer$.getChannelData($c$jscomp$1$$);
    if ($channelData$$.length != $$1$jscomp$3$$) {
      throw "Web Audio playback buffer length mismatch! Destination size: " + $channelData$$.length + " samples vs expected " + $$1$jscomp$3$$ + " samples!";
    }
    for (var $j$jscomp$1$$ = 0; $j$jscomp$1$$ < $$1$jscomp$3$$; ++$j$jscomp$1$$) {
      $channelData$$[$j$jscomp$1$$] = $HEAPF32$$[$$0$jscomp$7_buf$jscomp$18$$ + ($j$jscomp$1$$ * $numChannels$$ + $c$jscomp$1$$) >>> 0];
    }
  }
}, 1016985:($$0$jscomp$8$$, $$1$jscomp$4$$) => {
  for (var $SDL3$jscomp$5$$ = $Module$$.SDL3, $numChannels$jscomp$1$$ = $SDL3$jscomp$5$$.$audio_recording$.$currentRecordingBuffer$.numberOfChannels, $c$jscomp$2$$ = 0; $c$jscomp$2$$ < $numChannels$jscomp$1$$; ++$c$jscomp$2$$) {
    var $channelData$jscomp$1$$ = $SDL3$jscomp$5$$.$audio_recording$.$currentRecordingBuffer$.getChannelData($c$jscomp$2$$);
    if ($channelData$jscomp$1$$.length != $$1$jscomp$4$$) {
      throw "Web Audio recording buffer length mismatch! Destination size: " + $channelData$jscomp$1$$.length + " samples vs expected " + $$1$jscomp$4$$ + " samples!";
    }
    if (1 == $numChannels$jscomp$1$$) {
      for (var $j$jscomp$2$$ = 0; $j$jscomp$2$$ < $$1$jscomp$4$$; ++$j$jscomp$2$$) {
        $setValue$$($$0$jscomp$8$$ + 4 * $j$jscomp$2$$, $channelData$jscomp$1$$[$j$jscomp$2$$]);
      }
    } else {
      for ($j$jscomp$2$$ = 0; $j$jscomp$2$$ < $$1$jscomp$4$$; ++$j$jscomp$2$$) {
        $setValue$$($$0$jscomp$8$$ + 4 * ($j$jscomp$2$$ * $numChannels$jscomp$1$$ + $c$jscomp$2$$), $channelData$jscomp$1$$[$j$jscomp$2$$]);
      }
    }
  }
}, 1017612:() => {
  "undefined" === typeof $Module$$.SDL3 && ($Module$$.SDL3 = {});
  $Module$$.SDL3.$camera$ = {};
}, 1017713:() => void 0 === navigator.mediaDevices ? 0 : 1, 1017772:($$0$jscomp$9_constraints$jscomp$8$$, $$1$jscomp$5$$, $$2$jscomp$3$$, $$3$jscomp$3$$, $$4$jscomp$1$$, $$5$$, $$6$$) => {
  function $grabNextCameraFrame$$() {
    const $SDL3$jscomp$6$$ = $Module$$.SDL3;
    if ("undefined" !== typeof $SDL3$jscomp$6$$ && "undefined" !== typeof $SDL3$jscomp$6$$.$camera$ && "undefined" !== typeof $SDL3$jscomp$6$$.$camera$.stream) {
      var $now$jscomp$2$$ = performance.now();
      if ($now$jscomp$2$$ >= $SDL3$jscomp$6$$.$camera$.$next_frame_time$) {
        for ($dynCall$$("vi", $iterate$$, [$device$jscomp$12$$]); $SDL3$jscomp$6$$.$camera$.$next_frame_time$ < $now$jscomp$2$$;) {
          $SDL3$jscomp$6$$.$camera$.$next_frame_time$ += $SDL3$jscomp$6$$.$camera$.$fpsincrms$;
        }
      }
      requestAnimationFrame($grabNextCameraFrame$$);
    }
  }
  const $device$jscomp$12$$ = $$0$jscomp$9_constraints$jscomp$8$$, $iterate$$ = $$6$$;
  $$0$jscomp$9_constraints$jscomp$8$$ = {};
  0 >= $$1$jscomp$5$$ || 0 >= $$2$jscomp$3$$ ? $$0$jscomp$9_constraints$jscomp$8$$.video = !0 : ($$0$jscomp$9_constraints$jscomp$8$$.video = {}, $$0$jscomp$9_constraints$jscomp$8$$.video.width = $$1$jscomp$5$$, $$0$jscomp$9_constraints$jscomp$8$$.video.height = $$2$jscomp$3$$);
  0 < $$3$jscomp$3$$ && 0 < $$4$jscomp$1$$ && ($$0$jscomp$9_constraints$jscomp$8$$.video.frameRate = {ideal:$$3$jscomp$3$$ / $$4$jscomp$1$$});
  navigator.mediaDevices.getUserMedia($$0$jscomp$9_constraints$jscomp$8$$).then($stream$jscomp$65$$ => {
    var $actualfps_settings$jscomp$1$$ = $stream$jscomp$65$$.getVideoTracks()[0].getSettings();
    const $actualw$$ = $actualfps_settings$jscomp$1$$.width, $actualh$$ = $actualfps_settings$jscomp$1$$.height;
    $actualfps_settings$jscomp$1$$ = $actualfps_settings$jscomp$1$$.frameRate;
    console.log("Camera is opened! Actual spec: (" + $actualw$$ + "x" + $actualh$$ + "), fps=" + $actualfps_settings$jscomp$1$$);
    if ($dynCall$$("iiiiii", $$5$$, [$device$jscomp$12$$, 1, $actualw$$, $actualh$$, $actualfps_settings$jscomp$1$$])) {
      const $video$$ = document.createElement("video");
      $video$$.width = $actualw$$;
      $video$$.height = $actualh$$;
      $video$$.style.display = "none";
      $video$$.srcObject = $stream$jscomp$65$$;
      const $canvas$jscomp$15$$ = document.createElement("canvas");
      $canvas$jscomp$15$$.width = $actualw$$;
      $canvas$jscomp$15$$.height = $actualh$$;
      $canvas$jscomp$15$$.style.display = "none";
      const $ctx2d$$ = $canvas$jscomp$15$$.getContext("2d"), $SDL3$jscomp$7$$ = $Module$$.SDL3;
      $SDL3$jscomp$7$$.$camera$.width = $actualw$$;
      $SDL3$jscomp$7$$.$camera$.height = $actualh$$;
      $SDL3$jscomp$7$$.$camera$.$fps$ = $actualfps_settings$jscomp$1$$;
      $SDL3$jscomp$7$$.$camera$.$fpsincrms$ = 1e3 / $actualfps_settings$jscomp$1$$;
      $SDL3$jscomp$7$$.$camera$.stream = $stream$jscomp$65$$;
      $SDL3$jscomp$7$$.$camera$.video = $video$$;
      $SDL3$jscomp$7$$.$camera$.canvas = $canvas$jscomp$15$$;
      $SDL3$jscomp$7$$.$camera$.$ctx2d$ = $ctx2d$$;
      $SDL3$jscomp$7$$.$camera$.$next_frame_time$ = performance.now();
      $video$$.play();
      $video$$.addEventListener("loadedmetadata", () => {
        $grabNextCameraFrame$$();
      });
    }
  }).catch($err$jscomp$6$$ => {
    console.error("Tried to open camera but it threw an error! " + $err$jscomp$6$$.name + ": " + $err$jscomp$6$$.message);
    $dynCall$$("iiiiii", $$5$$, [$device$jscomp$12$$, 0, 0, 0, 0]);
  });
}, 1020063:() => {
  const $SDL3$jscomp$8$$ = $Module$$.SDL3;
  "undefined" !== typeof $SDL3$jscomp$8$$ && "undefined" !== typeof $SDL3$jscomp$8$$.$camera$ && "undefined" !== typeof $SDL3$jscomp$8$$.$camera$.stream && ($SDL3$jscomp$8$$.$camera$.stream.getTracks().forEach($track$jscomp$4$$ => $track$jscomp$4$$.stop()), $SDL3$jscomp$8$$.$camera$ = {});
}, 1020314:($$0$jscomp$10_imgrgba$$, $$1$jscomp$6$$, $$2$jscomp$4$$) => {
  const $SDL3$jscomp$9$$ = $Module$$.SDL3;
  if ("undefined" === typeof $SDL3$jscomp$9$$ || "undefined" === typeof $SDL3$jscomp$9$$.$camera$ || "undefined" === typeof $SDL3$jscomp$9$$.$camera$.$ctx2d$) {
    return 0;
  }
  $SDL3$jscomp$9$$.$camera$.$ctx2d$.drawImage($SDL3$jscomp$9$$.$camera$.video, 0, 0, $$0$jscomp$10_imgrgba$$, $$1$jscomp$6$$);
  $$0$jscomp$10_imgrgba$$ = $SDL3$jscomp$9$$.$camera$.$ctx2d$.getImageData(0, 0, $$0$jscomp$10_imgrgba$$, $$1$jscomp$6$$).data;
  $HEAPU8$$.set($$0$jscomp$10_imgrgba$$, $$2$jscomp$4$$ >>> 0);
  return 1;
}, 1020692:() => {
  "undefined" !== typeof $Module$$.SDL3 && ($Module$$.SDL3.$camera$ = void 0);
}, 1020779:($$0$jscomp$11_data8_src$jscomp$5$$, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$, $$2$jscomp$5_num$jscomp$10$$, $$3$jscomp$4_SDL3$jscomp$10_canvasId$$) => {
  $$3$jscomp$4_SDL3$jscomp$10_canvasId$$ = $UTF8ToString$$($$3$jscomp$4_SDL3$jscomp$10_canvasId$$);
  var $canvas$jscomp$16_j$jscomp$3$$ = document.querySelector($$3$jscomp$4_SDL3$jscomp$10_canvasId$$);
  $Module$$.SDL3 || ($Module$$.SDL3 = {});
  $$3$jscomp$4_SDL3$jscomp$10_canvasId$$ = $Module$$.SDL3;
  $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctxCanvas$ !== $canvas$jscomp$16_j$jscomp$3$$ && ($$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctx$ = $Browser$createContext$$($canvas$jscomp$16_j$jscomp$3$$, !1, !0), $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctxCanvas$ = $canvas$jscomp$16_j$jscomp$3$$);
  if ($$3$jscomp$4_SDL3$jscomp$10_canvasId$$.w !== $$0$jscomp$11_data8_src$jscomp$5$$ || $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$h$ !== $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ || $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$imageCtx$ !== $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctx$) {
    $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.image = $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctx$.createImageData($$0$jscomp$11_data8_src$jscomp$5$$, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$), $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.w = $$0$jscomp$11_data8_src$jscomp$5$$, $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$h$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$, $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$imageCtx$ = $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctx$;
  }
  $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.image.data;
  $$0$jscomp$11_data8_src$jscomp$5$$ = $$2$jscomp$5_num$jscomp$10$$ / 4;
  $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$data32Data$ !== $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ && ($$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$data32$ = new Int32Array($$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$.buffer), $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$data8$ = new Uint8Array($$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$.buffer), $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$data32Data$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$);
  $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$data32$;
  $$2$jscomp$5_num$jscomp$10$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$.length;
  $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$.set($HEAP32$$.subarray($$0$jscomp$11_data8_src$jscomp$5$$ >>> 0, $$0$jscomp$11_data8_src$jscomp$5$$ + $$2$jscomp$5_num$jscomp$10$$ >>> 0));
  $$0$jscomp$11_data8_src$jscomp$5$$ = $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$data8$;
  $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = 3;
  $canvas$jscomp$16_j$jscomp$3$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 * $$2$jscomp$5_num$jscomp$10$$;
  if (0 == $$2$jscomp$5_num$jscomp$10$$ % 8) {
    for (; $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ < $canvas$jscomp$16_j$jscomp$3$$;) {
      $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 
      255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 
      4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0, $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 
      255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0;
    }
  } else {
    for (; $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ < $canvas$jscomp$16_j$jscomp$3$$;) {
      $$0$jscomp$11_data8_src$jscomp$5$$[$$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$] = 255, $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ = $$1$jscomp$7_data$jscomp$104_data32_i$jscomp$68$$ + 4 | 0;
    }
  }
  $$3$jscomp$4_SDL3$jscomp$10_canvasId$$.$ctx$.putImageData($$3$jscomp$4_SDL3$jscomp$10_canvasId$$.image, 0, 0);
}, 1022008:($$0$jscomp$12_image$jscomp$3$$, $$1$jscomp$8_data32$jscomp$1$$, $$2$jscomp$6_url$jscomp$34$$, $$3$jscomp$5_urlBuf$$, $$4$jscomp$2_src$jscomp$6$$) => {
  var $canvas$jscomp$17$$ = document.createElement("canvas");
  $canvas$jscomp$17$$.width = $$0$jscomp$12_image$jscomp$3$$;
  $canvas$jscomp$17$$.height = $$1$jscomp$8_data32$jscomp$1$$;
  var $ctx$jscomp$13$$ = $canvas$jscomp$17$$.getContext("2d");
  $$0$jscomp$12_image$jscomp$3$$ = $ctx$jscomp$13$$.createImageData($$0$jscomp$12_image$jscomp$3$$, $$1$jscomp$8_data32$jscomp$1$$);
  $$4$jscomp$2_src$jscomp$6$$ /= 4;
  $$1$jscomp$8_data32$jscomp$1$$ = new Int32Array($$0$jscomp$12_image$jscomp$3$$.data.buffer);
  $$1$jscomp$8_data32$jscomp$1$$.set($HEAP32$$.subarray($$4$jscomp$2_src$jscomp$6$$ >>> 0, $$4$jscomp$2_src$jscomp$6$$ + $$1$jscomp$8_data32$jscomp$1$$.length >>> 0));
  $ctx$jscomp$13$$.putImageData($$0$jscomp$12_image$jscomp$3$$, 0, 0);
  $$2$jscomp$6_url$jscomp$34$$ = 0 === $$2$jscomp$6_url$jscomp$34$$ && 0 === $$3$jscomp$5_urlBuf$$ ? "url(" + $canvas$jscomp$17$$.toDataURL() + "), auto" : "url(" + $canvas$jscomp$17$$.toDataURL() + ") " + $$2$jscomp$6_url$jscomp$34$$ + " " + $$3$jscomp$5_urlBuf$$ + ", auto";
  $$3$jscomp$5_urlBuf$$ = $_SDL_malloc$$($$2$jscomp$6_url$jscomp$34$$.length + 1);
  $stringToUTF8$$($$2$jscomp$6_url$jscomp$34$$, $$3$jscomp$5_urlBuf$$, $$2$jscomp$6_url$jscomp$34$$.length + 1);
  return $$3$jscomp$5_urlBuf$$;
}, 1022666:$$0$jscomp$13$$ => {
  $Module$$.canvas && ($Module$$.canvas.style.cursor = $UTF8ToString$$($$0$jscomp$13$$));
}, 1022749:() => {
  $Module$$.canvas && ($Module$$.canvas.style.cursor = "none");
}, 1022818:($$0$jscomp$14$$, $$1$jscomp$9_SDL3$jscomp$11$$, $$2$jscomp$7$$) => {
  var $target$jscomp$163$$ = document.querySelector($UTF8ToString$$($$1$jscomp$9_SDL3$jscomp$11$$));
  if ($target$jscomp$163$$) {
    "undefined" === typeof $Module$$.SDL3 && ($Module$$.SDL3 = {});
    $$1$jscomp$9_SDL3$jscomp$11$$ = $Module$$.SDL3;
    var $makePointerEventCStruct$$ = function($event$jscomp$25$$) {
      var $ptr$jscomp$68$$ = 0;
      if ("pen" == $event$jscomp$25$$.pointerType && ($ptr$jscomp$68$$ = $_SDL_malloc$$($$2$jscomp$7$$), 0 != $ptr$jscomp$68$$)) {
        var $rect$jscomp$4$$ = $target$jscomp$163$$.getBoundingClientRect(), $idx$jscomp$8$$ = $ptr$jscomp$68$$ >> 2;
        $HEAP32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.pointerId;
        $HEAP32$$[$idx$jscomp$8$$++ >>> 0] = "undefined" !== typeof $event$jscomp$25$$.button ? $event$jscomp$25$$.button : -1;
        $HEAP32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.buttons;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.movementX;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.movementY;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.clientX - $rect$jscomp$4$$.left;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.clientY - $rect$jscomp$4$$.top;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.pressure;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.$tangentialPressure$;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.tiltX;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.tiltY;
        $HEAPF32$$[$idx$jscomp$8$$++ >>> 0] = $event$jscomp$25$$.$twist$;
      }
      return $ptr$jscomp$68$$;
    };
    $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerEnter$ = function($d$jscomp$2_event$jscomp$26$$) {
      $d$jscomp$2_event$jscomp$26$$ = $makePointerEventCStruct$$($d$jscomp$2_event$jscomp$26$$);
      0 != $d$jscomp$2_event$jscomp$26$$ && ($_Emscripten_HandlePointerEnter$$($$0$jscomp$14$$, $d$jscomp$2_event$jscomp$26$$), $_SDL_free$$($d$jscomp$2_event$jscomp$26$$));
    };
    $target$jscomp$163$$.addEventListener("pointerenter", $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerEnter$);
    $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerLeave$ = function($d$jscomp$3_event$jscomp$27$$) {
      $d$jscomp$3_event$jscomp$27$$ = $makePointerEventCStruct$$($d$jscomp$3_event$jscomp$27$$);
      0 != $d$jscomp$3_event$jscomp$27$$ && ($_Emscripten_HandlePointerLeave$$($$0$jscomp$14$$, $d$jscomp$3_event$jscomp$27$$), $_SDL_free$$($d$jscomp$3_event$jscomp$27$$));
    };
    $target$jscomp$163$$.addEventListener("pointerleave", $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerLeave$);
    $target$jscomp$163$$.addEventListener("pointercancel", $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerLeave$);
    $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerGeneric$ = function($d$jscomp$4_event$jscomp$28$$) {
      $d$jscomp$4_event$jscomp$28$$ = $makePointerEventCStruct$$($d$jscomp$4_event$jscomp$28$$);
      0 != $d$jscomp$4_event$jscomp$28$$ && ($_Emscripten_HandlePointerGeneric$$($$0$jscomp$14$$, $d$jscomp$4_event$jscomp$28$$), $_SDL_free$$($d$jscomp$4_event$jscomp$28$$));
    };
    $target$jscomp$163$$.addEventListener("pointerdown", $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerGeneric$);
    $target$jscomp$163$$.addEventListener("pointerup", $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerGeneric$);
    $target$jscomp$163$$.addEventListener("pointermove", $$1$jscomp$9_SDL3$jscomp$11$$.$eventHandlerPointerGeneric$);
  }
}, 1024611:($$0$jscomp$15$$, $$1$jscomp$10$$, $$2$jscomp$8$$) => {
  var $target$jscomp$164$$ = document.querySelector($UTF8ToString$$($$1$jscomp$10$$));
  if ($target$jscomp$164$$) {
    "undefined" === typeof $Module$$.SDL3 && ($Module$$.SDL3 = {});
    var $SDL3$jscomp$12$$ = $Module$$.SDL3, $makeDropEventCStruct$$ = function($event$jscomp$29$$) {
      var $ptr$jscomp$69$$ = $_SDL_malloc$$($$2$jscomp$8$$);
      if (0 != $ptr$jscomp$69$$) {
        var $idx$jscomp$9$$ = $ptr$jscomp$69$$ >> 2, $rect$jscomp$5$$ = $target$jscomp$164$$.getBoundingClientRect();
        $HEAP32$$[$idx$jscomp$9$$++ >>> 0] = $event$jscomp$29$$.clientX - $rect$jscomp$5$$.left;
        $HEAP32$$[$idx$jscomp$9$$++ >>> 0] = $event$jscomp$29$$.clientY - $rect$jscomp$5$$.top;
      }
      return $ptr$jscomp$69$$;
    };
    $SDL3$jscomp$12$$.$eventHandlerDropDragover$ = function($d$jscomp$5_event$jscomp$30$$) {
      $d$jscomp$5_event$jscomp$30$$.preventDefault();
      $d$jscomp$5_event$jscomp$30$$ = $makeDropEventCStruct$$($d$jscomp$5_event$jscomp$30$$);
      0 != $d$jscomp$5_event$jscomp$30$$ && ($_Emscripten_SendDragEvent$$($$0$jscomp$15$$, $d$jscomp$5_event$jscomp$30$$), $_SDL_free$$($d$jscomp$5_event$jscomp$30$$));
    };
    $target$jscomp$164$$.addEventListener("dragover", $SDL3$jscomp$12$$.$eventHandlerDropDragover$);
    $SDL3$jscomp$12$$.$drop_count$ = 0;
    $FS$mkdir$$("/tmp/filedrop");
    $SDL3$jscomp$12$$.$eventHandlerDropDrop$ = function($event$jscomp$31_plain_text$$) {
      $event$jscomp$31_plain_text$$.preventDefault();
      if ($event$jscomp$31_plain_text$$.dataTransfer.types.includes("text/plain")) {
        $event$jscomp$31_plain_text$$ = $stringToNewUTF8$$($event$jscomp$31_plain_text$$.dataTransfer.getData("text/plain")), $_Emscripten_SendDragTextEvent$$($$0$jscomp$15$$, $event$jscomp$31_plain_text$$), $_free$$($event$jscomp$31_plain_text$$);
      } else if ($event$jscomp$31_plain_text$$.dataTransfer.types.includes("Files")) {
        for (let $i$jscomp$69$$ = 0; $i$jscomp$69$$ < $event$jscomp$31_plain_text$$.dataTransfer.files.length; $i$jscomp$69$$++) {
          const $file$jscomp$2$$ = $event$jscomp$31_plain_text$$.dataTransfer.files.item($i$jscomp$69$$), $file_reader$$ = new FileReader();
          $file_reader$$.readAsArrayBuffer($file$jscomp$2$$);
          $file_reader$$.onload = function($contents_array8_event$jscomp$32$$) {
            var $fs_dropdir_stream$jscomp$66$$ = `/tmp/filedrop/${$SDL3$jscomp$12$$.$drop_count$}`;
            $SDL3$jscomp$12$$.$drop_count$ += 1;
            const $fs_filepath$$ = `${$fs_dropdir_stream$jscomp$66$$}/${$file$jscomp$2$$.name}`, $c_fs_filepath$$ = $stringToNewUTF8$$($fs_filepath$$);
            $contents_array8_event$jscomp$32$$ = new Uint8Array($contents_array8_event$jscomp$32$$.target.result);
            $FS$mkdir$$($fs_dropdir_stream$jscomp$66$$);
            $fs_dropdir_stream$jscomp$66$$ = $FS$open$$($fs_filepath$$, "w");
            $FS$write$$($fs_dropdir_stream$jscomp$66$$, $contents_array8_event$jscomp$32$$, 0, $contents_array8_event$jscomp$32$$.length, 0);
            $FS$close$$($fs_dropdir_stream$jscomp$66$$);
            $_Emscripten_SendDragFileEvent$$($$0$jscomp$15$$, $c_fs_filepath$$);
            $_free$$($c_fs_filepath$$);
            $_Emscripten_SendDragCompleteEvent$$($$0$jscomp$15$$);
          };
        }
      }
      $_Emscripten_SendDragCompleteEvent$$($$0$jscomp$15$$);
    };
    $target$jscomp$164$$.addEventListener("drop", $SDL3$jscomp$12$$.$eventHandlerDropDrop$);
    $SDL3$jscomp$12$$.$eventHandlerDropDragend$ = function($event$jscomp$33$$) {
      $event$jscomp$33$$.preventDefault();
      $_Emscripten_SendDragCompleteEvent$$($$0$jscomp$15$$);
    };
    $target$jscomp$164$$.addEventListener("dragend", $SDL3$jscomp$12$$.$eventHandlerDropDragend$);
    $target$jscomp$164$$.addEventListener("dragleave", $SDL3$jscomp$12$$.$eventHandlerDropDragend$);
  }
}, 1026764:$$0$jscomp$16_target$jscomp$165$$ => {
  if ($$0$jscomp$16_target$jscomp$165$$ = document.querySelector($UTF8ToString$$($$0$jscomp$16_target$jscomp$165$$))) {
    var $SDL3$jscomp$13$$ = $Module$$.SDL3;
    $$0$jscomp$16_target$jscomp$165$$.removeEventListener("dragleave", $SDL3$jscomp$13$$.$eventHandlerDropDragend$);
    $$0$jscomp$16_target$jscomp$165$$.removeEventListener("dragend", $SDL3$jscomp$13$$.$eventHandlerDropDragend$);
    $$0$jscomp$16_target$jscomp$165$$.removeEventListener("drop", $SDL3$jscomp$13$$.$eventHandlerDropDrop$);
    $SDL3$jscomp$13$$.$drop_count$ = void 0;
    "/tmp/filedrop";
    var $parent$jscomp$inline_225$$ = $FS$lookupPath$$("/tmp/filedrop", {parent:!0}).node, $name$jscomp$inline_226$$ = $PATH$basename$$("/tmp/filedrop"), $node$jscomp$inline_227$$ = $FS$lookupNode$$($parent$jscomp$inline_225$$, $name$jscomp$inline_226$$), $errCode$jscomp$inline_228$$ = $FS$mayDelete$$($parent$jscomp$inline_225$$, $name$jscomp$inline_226$$, !0);
    if ($errCode$jscomp$inline_228$$) {
      throw new $FS$ErrnoError$$($errCode$jscomp$inline_228$$);
    }
    if (!$parent$jscomp$inline_225$$.$node_ops$.rmdir) {
      throw new $FS$ErrnoError$$(63);
    }
    if ($node$jscomp$inline_227$$.$mounted$) {
      throw new $FS$ErrnoError$$(10);
    }
    $parent$jscomp$inline_225$$.$node_ops$.rmdir($parent$jscomp$inline_225$$, $name$jscomp$inline_226$$);
    $FS$hashRemoveNode$$($node$jscomp$inline_227$$);
    $$0$jscomp$16_target$jscomp$165$$.removeEventListener("dragover", $SDL3$jscomp$13$$.$eventHandlerDropDragover$);
    $SDL3$jscomp$13$$.$eventHandlerDropDragover$ = void 0;
    $SDL3$jscomp$13$$.$eventHandlerDropDrop$ = void 0;
    $SDL3$jscomp$13$$.$eventHandlerDropDragend$ = void 0;
  }
}, 1027594:$$0$jscomp$17_target$jscomp$166$$ => {
  if ($$0$jscomp$17_target$jscomp$166$$ = document.querySelector($UTF8ToString$$($$0$jscomp$17_target$jscomp$166$$))) {
    var $SDL3$jscomp$14$$ = $Module$$.SDL3;
    $$0$jscomp$17_target$jscomp$166$$.removeEventListener("pointerenter", $SDL3$jscomp$14$$.$eventHandlerPointerEnter$);
    $$0$jscomp$17_target$jscomp$166$$.removeEventListener("pointerleave", $SDL3$jscomp$14$$.$eventHandlerPointerLeave$);
    $$0$jscomp$17_target$jscomp$166$$.removeEventListener("pointercancel", $SDL3$jscomp$14$$.$eventHandlerPointerLeave$);
    $$0$jscomp$17_target$jscomp$166$$.removeEventListener("pointerdown", $SDL3$jscomp$14$$.$eventHandlerPointerGeneric$);
    $$0$jscomp$17_target$jscomp$166$$.removeEventListener("pointerup", $SDL3$jscomp$14$$.$eventHandlerPointerGeneric$);
    $$0$jscomp$17_target$jscomp$166$$.removeEventListener("pointermove", $SDL3$jscomp$14$$.$eventHandlerPointerGeneric$);
    $SDL3$jscomp$14$$.$eventHandlerPointerEnter$ = void 0;
    $SDL3$jscomp$14$$.$eventHandlerPointerLeave$ = void 0;
    $SDL3$jscomp$14$$.$eventHandlerPointerGeneric$ = void 0;
  }
}, 1028279:() => window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)").matches ? 0 : window.matchMedia("(prefers-color-scheme: dark)").matches ? 1 : -1 : -1, 1028488:() => {
  if ("undefined" !== typeof $Module$$.SDL3) {
    var $SDL3$jscomp$15$$ = $Module$$.SDL3;
    $SDL3$jscomp$15$$.$themeChangedMatchMedia$.removeEventListener("change", $SDL3$jscomp$15$$.$eventHandlerThemeChanged$);
    $SDL3$jscomp$15$$.$themeChangedMatchMedia$ = void 0;
    $SDL3$jscomp$15$$.$eventHandlerThemeChanged$ = void 0;
  }
}, 1028741:() => window.innerWidth, 1028771:() => window.innerHeight, 1028802:$$0$jscomp$18$$ => {
  $Module$$.requestFullscreen = function() {
    $_requestFullscreenThroughSDL$$($$0$jscomp$18$$);
  };
}, 1028911:() => {
  $Module$$.requestFullscreen = function() {
  };
}, 1028985:() => {
  if (window.matchMedia) {
    "undefined" === typeof $Module$$.SDL3 && ($Module$$.SDL3 = {});
    var $SDL3$jscomp$16$$ = $Module$$.SDL3;
    $SDL3$jscomp$16$$.$eventHandlerThemeChanged$ = function() {
      $_Emscripten_SendSystemThemeChangedEvent$$();
    };
    $SDL3$jscomp$16$$.$themeChangedMatchMedia$ = window.matchMedia("(prefers-color-scheme: dark)");
    $SDL3$jscomp$16$$.$themeChangedMatchMedia$.addEventListener("change", $SDL3$jscomp$16$$.$eventHandlerThemeChanged$);
  }
}}, $_main$$ = $Module$$._main = $makeInvalidEarlyAccess$$("_main"), $_free$$ = $makeInvalidEarlyAccess$$("_free"), $_malloc$$ = $makeInvalidEarlyAccess$$("_malloc"), $_strerror$$ = $makeInvalidEarlyAccess$$("_strerror"), $_SDL_free$$ = $Module$$._SDL_free = $makeInvalidEarlyAccess$$("_SDL_free"), $_SDL_malloc$$ = $Module$$._SDL_malloc = $makeInvalidEarlyAccess$$("_SDL_malloc");
$Module$$._SDL_calloc = $makeInvalidEarlyAccess$$("_SDL_calloc");
$Module$$._SDL_realloc = $makeInvalidEarlyAccess$$("_SDL_realloc");
var $_fflush$$ = $makeInvalidEarlyAccess$$("_fflush"), $_Emscripten_HandlePointerEnter$$ = $Module$$._Emscripten_HandlePointerEnter = $makeInvalidEarlyAccess$$("_Emscripten_HandlePointerEnter"), $_Emscripten_HandlePointerLeave$$ = $Module$$._Emscripten_HandlePointerLeave = $makeInvalidEarlyAccess$$("_Emscripten_HandlePointerLeave"), $_Emscripten_HandlePointerGeneric$$ = $Module$$._Emscripten_HandlePointerGeneric = $makeInvalidEarlyAccess$$("_Emscripten_HandlePointerGeneric"), $_Emscripten_SendDragEvent$$ = 
$Module$$._Emscripten_SendDragEvent = $makeInvalidEarlyAccess$$("_Emscripten_SendDragEvent"), $_Emscripten_SendDragCompleteEvent$$ = $Module$$._Emscripten_SendDragCompleteEvent = $makeInvalidEarlyAccess$$("_Emscripten_SendDragCompleteEvent"), $_Emscripten_SendDragTextEvent$$ = $Module$$._Emscripten_SendDragTextEvent = $makeInvalidEarlyAccess$$("_Emscripten_SendDragTextEvent"), $_Emscripten_SendDragFileEvent$$ = $Module$$._Emscripten_SendDragFileEvent = $makeInvalidEarlyAccess$$("_Emscripten_SendDragFileEvent"), 
$_Emscripten_SendSystemThemeChangedEvent$$ = $Module$$._Emscripten_SendSystemThemeChangedEvent = $makeInvalidEarlyAccess$$("_Emscripten_SendSystemThemeChangedEvent"), $_requestFullscreenThroughSDL$$ = $Module$$._requestFullscreenThroughSDL = $makeInvalidEarlyAccess$$("_requestFullscreenThroughSDL"), $_emwgpuCreateBindGroup$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateBindGroup"), $_emwgpuCreateBindGroupLayout$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateBindGroupLayout"), $_emwgpuCreateCommandBuffer$$ = 
$makeInvalidEarlyAccess$$("_emwgpuCreateCommandBuffer"), $_emwgpuCreateCommandEncoder$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateCommandEncoder"), $_emwgpuCreatePipelineLayout$$ = $makeInvalidEarlyAccess$$("_emwgpuCreatePipelineLayout"), $_emwgpuCreateRenderPassEncoder$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateRenderPassEncoder"), $_emwgpuCreateRenderPipeline$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateRenderPipeline"), $_emwgpuCreateSurface$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateSurface"), 
$_emwgpuCreateTexture$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateTexture"), $_emwgpuCreateTextureView$$ = $makeInvalidEarlyAccess$$("_emwgpuCreateTextureView"), $_emwgpuOnDeviceLostCompleted$$ = $makeInvalidEarlyAccess$$("_emwgpuOnDeviceLostCompleted"), $_emwgpuOnRequestAdapterCompleted$$ = $makeInvalidEarlyAccess$$("_emwgpuOnRequestAdapterCompleted"), $_emwgpuOnRequestDeviceCompleted$$ = $makeInvalidEarlyAccess$$("_emwgpuOnRequestDeviceCompleted"), $_emwgpuOnUncapturedError$$ = $makeInvalidEarlyAccess$$("_emwgpuOnUncapturedError"), 
$_emscripten_stack_get_end$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_get_end"), $_emscripten_stack_init$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_init"), $__emscripten_stack_restore$$ = $makeInvalidEarlyAccess$$("__emscripten_stack_restore"), $__emscripten_stack_alloc$$ = $makeInvalidEarlyAccess$$("__emscripten_stack_alloc"), $_emscripten_stack_get_current$$ = $makeInvalidEarlyAccess$$("_emscripten_stack_get_current"), dynCall_vi = $makeInvalidEarlyAccess$$("dynCall_vi"), dynCall_vii = 
$makeInvalidEarlyAccess$$("dynCall_vii"), dynCall_iii = $makeInvalidEarlyAccess$$("dynCall_iii"), $dynCall_iiii$$ = $makeInvalidEarlyAccess$$("dynCall_iiii"), dynCall_v = $makeInvalidEarlyAccess$$("dynCall_v"), $_asyncify_start_unwind$$ = $makeInvalidEarlyAccess$$("_asyncify_start_unwind"), $_asyncify_stop_unwind$$ = $makeInvalidEarlyAccess$$("_asyncify_stop_unwind"), $_asyncify_start_rewind$$ = $makeInvalidEarlyAccess$$("_asyncify_start_rewind"), $_asyncify_stop_rewind$$ = $makeInvalidEarlyAccess$$("_asyncify_stop_rewind"), 
$wasmImports$$ = {__assert_fail:function($condition$jscomp$3$$, $filename$jscomp$18$$, $line$jscomp$7$$, $func$jscomp$8$$) {
  $filename$jscomp$18$$ >>>= 0;
  $func$jscomp$8$$ >>>= 0;
  return $abort$$(`Assertion failed: ${$UTF8ToString$$($condition$jscomp$3$$ >>> 0)}, at: ` + [$filename$jscomp$18$$ ? $UTF8ToString$$($filename$jscomp$18$$) : "unknown filename", $line$jscomp$7$$, $func$jscomp$8$$ ? $UTF8ToString$$($func$jscomp$8$$) : "unknown function"]);
}, __cxa_throw:function($JSCompiler_StaticMethods_init$self$jscomp$inline_230_ptr$jscomp$6$$, $type$jscomp$174$$, $destructor$jscomp$2$$) {
  $JSCompiler_StaticMethods_init$self$jscomp$inline_230_ptr$jscomp$6$$ = new $ExceptionInfo$$($JSCompiler_StaticMethods_init$self$jscomp$inline_230_ptr$jscomp$6$$ >>> 0);
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_230_ptr$jscomp$6$$.$ptr$ + 16 >>> 2 >>> 0] = 0;
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_230_ptr$jscomp$6$$.$ptr$ + 4 >>> 2 >>> 0] = $type$jscomp$174$$ >>> 0;
  $HEAPU32$$[$JSCompiler_StaticMethods_init$self$jscomp$inline_230_ptr$jscomp$6$$.$ptr$ + 8 >>> 2 >>> 0] = $destructor$jscomp$2$$ >>> 0;
  $uncaughtExceptionCount$$++;
  $assert$$(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
}, __syscall_fcntl64:function($fd$jscomp$33$$, $cmd$jscomp$1$$, $varargs$$) {
  $SYSCALLS$varargs$$ = $varargs$$ >>> 0;
  try {
    var $stream$jscomp$53$$ = $FS$getStreamChecked$$($fd$jscomp$33$$);
    switch($cmd$jscomp$1$$) {
      case 0:
        var $arg$jscomp$11$$ = $syscallGetVarargI$$();
        if (0 > $arg$jscomp$11$$) {
          break;
        }
        for (; $FS$streams$$[$arg$jscomp$11$$];) {
          $arg$jscomp$11$$++;
        }
        return $FS$dupStream$$($stream$jscomp$53$$, $arg$jscomp$11$$).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return $stream$jscomp$53$$.flags;
      case 4:
        return $arg$jscomp$11$$ = $syscallGetVarargI$$(), $stream$jscomp$53$$.flags |= $arg$jscomp$11$$, 0;
      case 12:
        return $arg$jscomp$11$$ = $syscallGetVarargI$$(), $HEAP16$$[$arg$jscomp$11$$ + 0 >>> 1 >>> 0] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch ($e$jscomp$26$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$26$$.name) {
      throw $e$jscomp$26$$;
    }
    return -$e$jscomp$26$$.$errno$;
  }
}, __syscall_fdatasync:function($fd$jscomp$34$$) {
  try {
    return $FS$getStreamChecked$$($fd$jscomp$34$$), 0;
  } catch ($e$jscomp$27$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$27$$.name) {
      throw $e$jscomp$27$$;
    }
    return -$e$jscomp$27$$.$errno$;
  }
}, __syscall_fstat64:function($arg$jscomp$inline_238_fd$jscomp$35$$, $JSCompiler_temp_const$jscomp$9_buf$jscomp$12$$) {
  try {
    $JSCompiler_temp_const$jscomp$9_buf$jscomp$12$$ >>>= 0;
    var $stream$jscomp$inline_235$$ = $FS$getStreamChecked$$($arg$jscomp$inline_238_fd$jscomp$35$$), $node$jscomp$inline_236$$ = $stream$jscomp$inline_235$$.node, $getattr$jscomp$inline_237$$ = $stream$jscomp$inline_235$$.$stream_ops$.$getattr$;
    $arg$jscomp$inline_238_fd$jscomp$35$$ = $getattr$jscomp$inline_237$$ ? $stream$jscomp$inline_235$$ : $node$jscomp$inline_236$$;
    $getattr$jscomp$inline_237$$ ??= $node$jscomp$inline_236$$.$node_ops$.$getattr$;
    $FS$checkOpExists$$($getattr$jscomp$inline_237$$, 63);
    var $JSCompiler_inline_result$jscomp$10$$ = $getattr$jscomp$inline_237$$($arg$jscomp$inline_238_fd$jscomp$35$$);
    return $SYSCALLS$writeStat$$($JSCompiler_temp_const$jscomp$9_buf$jscomp$12$$, $JSCompiler_inline_result$jscomp$10$$);
  } catch ($e$jscomp$28$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$28$$.name) {
      throw $e$jscomp$28$$;
    }
    return -$e$jscomp$28$$.$errno$;
  }
}, __syscall_getcwd:function($buf$jscomp$13$$, $size$jscomp$26$$) {
  $size$jscomp$26$$ >>>= 0;
  try {
    if (0 === $size$jscomp$26$$) {
      return -28;
    }
    var $cwdLengthInBytes$$ = $lengthBytesUTF8$$("/") + 1;
    if ($size$jscomp$26$$ < $cwdLengthInBytes$$) {
      return -68;
    }
    $stringToUTF8$$("/", $buf$jscomp$13$$ >>> 0, $size$jscomp$26$$);
    return $cwdLengthInBytes$$;
  } catch ($e$jscomp$29$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$29$$.name) {
      throw $e$jscomp$29$$;
    }
    return -$e$jscomp$29$$.$errno$;
  }
}, __syscall_getdents64:function($fd$jscomp$36_pos$jscomp$5$$, $dirp$$, $count$jscomp$39_idx$jscomp$4$$) {
  $dirp$$ >>>= 0;
  $count$jscomp$39_idx$jscomp$4$$ >>>= 0;
  try {
    var $stream$jscomp$55$$ = $FS$getStreamChecked$$($fd$jscomp$36_pos$jscomp$5$$);
    if (!$stream$jscomp$55$$.$getdents$) {
      var $node$jscomp$inline_241$$ = $FS$lookupPath$$($stream$jscomp$55$$.path, {$follow$:!0}).node;
      var $JSCompiler_inline_result$jscomp$8$$ = $FS$checkOpExists$$($node$jscomp$inline_241$$.$node_ops$.readdir, 54)($node$jscomp$inline_241$$);
      $stream$jscomp$55$$.$getdents$ = $JSCompiler_inline_result$jscomp$8$$;
    }
    $fd$jscomp$36_pos$jscomp$5$$ = 0;
    var $off$$ = $FS$llseek$$($stream$jscomp$55$$, 0, 1), $startIdx$jscomp$1$$ = Math.floor($off$$ / 280), $endIdx$jscomp$1$$ = Math.min($stream$jscomp$55$$.$getdents$.length, $startIdx$jscomp$1$$ + Math.floor($count$jscomp$39_idx$jscomp$4$$ / 280));
    for ($count$jscomp$39_idx$jscomp$4$$ = $startIdx$jscomp$1$$; $count$jscomp$39_idx$jscomp$4$$ < $endIdx$jscomp$1$$; $count$jscomp$39_idx$jscomp$4$$++) {
      var $name$jscomp$105$$ = $stream$jscomp$55$$.$getdents$[$count$jscomp$39_idx$jscomp$4$$];
      if ("." === $name$jscomp$105$$) {
        var $id$jscomp$11$$ = $stream$jscomp$55$$.node.id;
        var $type$jscomp$176$$ = 4;
      } else if (".." === $name$jscomp$105$$) {
        $id$jscomp$11$$ = $FS$lookupPath$$($stream$jscomp$55$$.path, {parent:!0}).node.id, $type$jscomp$176$$ = 4;
      } else {
        try {
          var $child$$ = $FS$lookupNode$$($stream$jscomp$55$$.node, $name$jscomp$105$$);
        } catch ($e$jscomp$30$$) {
          if (28 === $e$jscomp$30$$?.$errno$) {
            continue;
          }
          throw $e$jscomp$30$$;
        }
        $id$jscomp$11$$ = $child$$.id;
        $type$jscomp$176$$ = 8192 === ($child$$.mode & 61440) ? 2 : $FS$isDir$$($child$$.mode) ? 4 : 40960 === ($child$$.mode & 61440) ? 10 : 8;
      }
      $assert$$($id$jscomp$11$$);
      $HEAP64$$[$dirp$$ + $fd$jscomp$36_pos$jscomp$5$$ >>> 3 >>> 0] = BigInt($id$jscomp$11$$);
      $HEAP64$$[$dirp$$ + $fd$jscomp$36_pos$jscomp$5$$ + 8 >>> 3 >>> 0] = BigInt(280 * ($count$jscomp$39_idx$jscomp$4$$ + 1));
      $HEAP16$$[$dirp$$ + $fd$jscomp$36_pos$jscomp$5$$ + 16 >>> 1 >>> 0] = 280;
      $HEAP8$$[$dirp$$ + $fd$jscomp$36_pos$jscomp$5$$ + 18 >>> 0] = $type$jscomp$176$$;
      $stringToUTF8$$($name$jscomp$105$$, $dirp$$ + $fd$jscomp$36_pos$jscomp$5$$ + 19, 256);
      $fd$jscomp$36_pos$jscomp$5$$ += 280;
    }
    $FS$llseek$$($stream$jscomp$55$$, 280 * $count$jscomp$39_idx$jscomp$4$$, 0);
    return $fd$jscomp$36_pos$jscomp$5$$;
  } catch ($e$jscomp$31$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$31$$.name) {
      throw $e$jscomp$31$$;
    }
    return -$e$jscomp$31$$.$errno$;
  }
}, __syscall_ioctl:function($fd$jscomp$37$$, $JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$, $varargs$jscomp$1$$) {
  $SYSCALLS$varargs$$ = $varargs$jscomp$1$$ >>> 0;
  try {
    var $stream$jscomp$56$$ = $FS$getStreamChecked$$($fd$jscomp$37$$);
    switch($JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$) {
      case 21509:
        return $stream$jscomp$56$$.tty ? 0 : -59;
      case 21505:
        if (!$stream$jscomp$56$$.tty) {
          return -59;
        }
        if ($stream$jscomp$56$$.tty.$ops$.$ioctl_tcgets$) {
          $JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$ = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var $arg$jscomp$inline_245_argp$$ = $syscallGetVarargI$$();
          $HEAP32$$[$arg$jscomp$inline_245_argp$$ >>> 2 >>> 0] = 25856;
          $HEAP32$$[$arg$jscomp$inline_245_argp$$ + 4 >>> 2 >>> 0] = 5;
          $HEAP32$$[$arg$jscomp$inline_245_argp$$ + 8 >>> 2 >>> 0] = 191;
          $HEAP32$$[$arg$jscomp$inline_245_argp$$ + 12 >>> 2 >>> 0] = 35387;
          for (var $i$jscomp$21_winsize$$ = 0; 32 > $i$jscomp$21_winsize$$; $i$jscomp$21_winsize$$++) {
            $HEAP8$$[$arg$jscomp$inline_245_argp$$ + $i$jscomp$21_winsize$$ + 17 >>> 0] = $JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$[$i$jscomp$21_winsize$$] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return $stream$jscomp$56$$.tty ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!$stream$jscomp$56$$.tty) {
          return -59;
        }
        if ($stream$jscomp$56$$.tty.$ops$.$ioctl_tcsets$) {
          for ($arg$jscomp$inline_245_argp$$ = $syscallGetVarargI$$(), $JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$ = [], $i$jscomp$21_winsize$$ = 0; 32 > $i$jscomp$21_winsize$$; $i$jscomp$21_winsize$$++) {
            $JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$.push($HEAP8$$[$arg$jscomp$inline_245_argp$$ + $i$jscomp$21_winsize$$ + 17 >>> 0]);
          }
        }
        return 0;
      case 21519:
        if (!$stream$jscomp$56$$.tty) {
          return -59;
        }
        $arg$jscomp$inline_245_argp$$ = $syscallGetVarargI$$();
        return $HEAP32$$[$arg$jscomp$inline_245_argp$$ >>> 2 >>> 0] = 0;
      case 21520:
        return $stream$jscomp$56$$.tty ? -28 : -59;
      case 21537:
      case 21531:
        $arg$jscomp$inline_245_argp$$ = $syscallGetVarargI$$();
        if (!$stream$jscomp$56$$.$stream_ops$.$ioctl$) {
          throw new $FS$ErrnoError$$(59);
        }
        return $stream$jscomp$56$$.$stream_ops$.$ioctl$($stream$jscomp$56$$, $JSCompiler_object_inline_c_cc_413_c_cc_op$jscomp$1$$, $arg$jscomp$inline_245_argp$$);
      case 21523:
        if (!$stream$jscomp$56$$.tty) {
          return -59;
        }
        $stream$jscomp$56$$.tty.$ops$.$ioctl_tiocgwinsz$ && ($i$jscomp$21_winsize$$ = [24, 80], $arg$jscomp$inline_245_argp$$ = $syscallGetVarargI$$(), $HEAP16$$[$arg$jscomp$inline_245_argp$$ >>> 1 >>> 0] = $i$jscomp$21_winsize$$[0], $HEAP16$$[$arg$jscomp$inline_245_argp$$ + 2 >>> 1 >>> 0] = $i$jscomp$21_winsize$$[1]);
        return 0;
      case 21524:
        return $stream$jscomp$56$$.tty ? 0 : -59;
      case 21515:
        return $stream$jscomp$56$$.tty ? 0 : -59;
      default:
        return -28;
    }
  } catch ($e$jscomp$32$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$32$$.name) {
      throw $e$jscomp$32$$;
    }
    return -$e$jscomp$32$$.$errno$;
  }
}, __syscall_lstat64:function($path$jscomp$76$$, $buf$jscomp$14$$) {
  $path$jscomp$76$$ >>>= 0;
  $buf$jscomp$14$$ >>>= 0;
  try {
    return $path$jscomp$76$$ = $UTF8ToString$$($path$jscomp$76$$), $SYSCALLS$writeStat$$($buf$jscomp$14$$, $FS$stat$$($path$jscomp$76$$, !0));
  } catch ($e$jscomp$33$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$33$$.name) {
      throw $e$jscomp$33$$;
    }
    return -$e$jscomp$33$$.$errno$;
  }
}, __syscall_newfstatat:function($dirfd$jscomp$1$$, $path$jscomp$77$$, $buf$jscomp$15$$, $flags$jscomp$16$$) {
  $path$jscomp$77$$ >>>= 0;
  $buf$jscomp$15$$ >>>= 0;
  try {
    $path$jscomp$77$$ = $UTF8ToString$$($path$jscomp$77$$);
    var $nofollow$$ = $flags$jscomp$16$$ & 256, $allowEmpty$jscomp$1$$ = $flags$jscomp$16$$ & 4096;
    $flags$jscomp$16$$ &= -6401;
    $assert$$(!$flags$jscomp$16$$, `unknown flags in __syscall_newfstatat: ${$flags$jscomp$16$$}`);
    $path$jscomp$77$$ = $SYSCALLS$calculateAt$$($dirfd$jscomp$1$$, $path$jscomp$77$$, $allowEmpty$jscomp$1$$);
    return $SYSCALLS$writeStat$$($buf$jscomp$15$$, $nofollow$$ ? $FS$stat$$($path$jscomp$77$$, !0) : $FS$stat$$($path$jscomp$77$$));
  } catch ($e$jscomp$34$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$34$$.name) {
      throw $e$jscomp$34$$;
    }
    return -$e$jscomp$34$$.$errno$;
  }
}, __syscall_openat:function($dirfd$jscomp$2$$, $path$jscomp$78$$, $flags$jscomp$17$$, $varargs$jscomp$2$$) {
  $path$jscomp$78$$ >>>= 0;
  $SYSCALLS$varargs$$ = $varargs$jscomp$2$$ >>>= 0;
  try {
    $path$jscomp$78$$ = $UTF8ToString$$($path$jscomp$78$$);
    $path$jscomp$78$$ = $SYSCALLS$calculateAt$$($dirfd$jscomp$2$$, $path$jscomp$78$$);
    var $mode$jscomp$52$$ = $varargs$jscomp$2$$ ? $syscallGetVarargI$$() : 0;
    return $FS$open$$($path$jscomp$78$$, $flags$jscomp$17$$, $mode$jscomp$52$$).fd;
  } catch ($e$jscomp$35$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$35$$.name) {
      throw $e$jscomp$35$$;
    }
    return -$e$jscomp$35$$.$errno$;
  }
}, __syscall_stat64:function($path$jscomp$79$$, $buf$jscomp$16$$) {
  $path$jscomp$79$$ >>>= 0;
  $buf$jscomp$16$$ >>>= 0;
  try {
    return $path$jscomp$79$$ = $UTF8ToString$$($path$jscomp$79$$), $SYSCALLS$writeStat$$($buf$jscomp$16$$, $FS$stat$$($path$jscomp$79$$));
  } catch ($e$jscomp$36$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$36$$.name) {
      throw $e$jscomp$36$$;
    }
    return -$e$jscomp$36$$.$errno$;
  }
}, _abort_js:() => $abort$$("native code called abort()"), _emscripten_fs_load_embedded_files:function($ptr$jscomp$10$$) {
  $ptr$jscomp$10$$ >>>= 0;
  do {
    var $name$jscomp$106_name_addr$$ = $HEAPU32$$[$ptr$jscomp$10$$ >>> 2 >>> 0];
    $ptr$jscomp$10$$ += 4;
    var $len$jscomp$10$$ = $HEAPU32$$[$ptr$jscomp$10$$ >>> 2 >>> 0];
    $ptr$jscomp$10$$ += 4;
    var $content$$ = $HEAPU32$$[$ptr$jscomp$10$$ >>> 2 >>> 0];
    $ptr$jscomp$10$$ += 4;
    $name$jscomp$106_name_addr$$ = $UTF8ToString$$($name$jscomp$106_name_addr$$);
    $FS$createPath$$("/", $PATH$dirname$$($name$jscomp$106_name_addr$$));
    $FS$createDataFile$$($name$jscomp$106_name_addr$$, null, $HEAP8$$.subarray($content$$ >>> 0, $content$$ + $len$jscomp$10$$ >>> 0), !0, !0, !0);
  } while ($HEAPU32$$[$ptr$jscomp$10$$ >>> 2 >>> 0]);
}, _gmtime_js:function($date$jscomp$3_time$$, $tmPtr$$) {
  $date$jscomp$3_time$$ = $bigintToI53Checked$$($date$jscomp$3_time$$);
  $tmPtr$$ >>>= 0;
  $date$jscomp$3_time$$ = new Date(1e3 * $date$jscomp$3_time$$);
  $HEAP32$$[$tmPtr$$ >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCSeconds();
  $HEAP32$$[$tmPtr$$ + 4 >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCMinutes();
  $HEAP32$$[$tmPtr$$ + 8 >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCHours();
  $HEAP32$$[$tmPtr$$ + 12 >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCDate();
  $HEAP32$$[$tmPtr$$ + 16 >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCMonth();
  $HEAP32$$[$tmPtr$$ + 20 >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCFullYear() - 1900;
  $HEAP32$$[$tmPtr$$ + 24 >>> 2 >>> 0] = $date$jscomp$3_time$$.getUTCDay();
  $HEAP32$$[$tmPtr$$ + 28 >>> 2 >>> 0] = ($date$jscomp$3_time$$.getTime() - Date.UTC($date$jscomp$3_time$$.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0;
}, _localtime_js:function($date$jscomp$5_time$jscomp$1$$, $tmPtr$jscomp$1$$) {
  $date$jscomp$5_time$jscomp$1$$ = $bigintToI53Checked$$($date$jscomp$5_time$jscomp$1$$);
  $tmPtr$jscomp$1$$ >>>= 0;
  $date$jscomp$5_time$jscomp$1$$ = new Date(1e3 * $date$jscomp$5_time$jscomp$1$$);
  $HEAP32$$[$tmPtr$jscomp$1$$ >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getSeconds();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 4 >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getMinutes();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 8 >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getHours();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 12 >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getDate();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 16 >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getMonth();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 20 >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getFullYear() - 1900;
  $HEAP32$$[$tmPtr$jscomp$1$$ + 24 >>> 2 >>> 0] = $date$jscomp$5_time$jscomp$1$$.getDay();
  var $summerOffset_year$jscomp$inline_512$$ = $date$jscomp$5_time$jscomp$1$$.getFullYear();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 28 >>> 2 >>> 0] = (0 !== $summerOffset_year$jscomp$inline_512$$ % 4 || 0 === $summerOffset_year$jscomp$inline_512$$ % 100 && 0 !== $summerOffset_year$jscomp$inline_512$$ % 400 ? $MONTH_DAYS_REGULAR_CUMULATIVE$$ : $MONTH_DAYS_LEAP_CUMULATIVE$$)[$date$jscomp$5_time$jscomp$1$$.getMonth()] + $date$jscomp$5_time$jscomp$1$$.getDate() - 1 | 0;
  $HEAP32$$[$tmPtr$jscomp$1$$ + 36 >>> 2 >>> 0] = -(60 * $date$jscomp$5_time$jscomp$1$$.getTimezoneOffset());
  $summerOffset_year$jscomp$inline_512$$ = (new Date($date$jscomp$5_time$jscomp$1$$.getFullYear(), 6, 1)).getTimezoneOffset();
  var $winterOffset$$ = (new Date($date$jscomp$5_time$jscomp$1$$.getFullYear(), 0, 1)).getTimezoneOffset();
  $HEAP32$$[$tmPtr$jscomp$1$$ + 32 >>> 2 >>> 0] = ($summerOffset_year$jscomp$inline_512$$ != $winterOffset$$ && $date$jscomp$5_time$jscomp$1$$.getTimezoneOffset() == Math.min($winterOffset$$, $summerOffset_year$jscomp$inline_512$$)) | 0;
}, _tzset_js:function($timezone_winterName$$, $daylight_extractZone_summerName$$, $std_name$$, $dst_name$$) {
  $std_name$$ >>>= 0;
  $dst_name$$ >>>= 0;
  var $currentYear_summerOffset$jscomp$1$$ = (new Date()).getFullYear(), $winterOffset$jscomp$1$$ = (new Date($currentYear_summerOffset$jscomp$1$$, 0, 1)).getTimezoneOffset();
  $currentYear_summerOffset$jscomp$1$$ = (new Date($currentYear_summerOffset$jscomp$1$$, 6, 1)).getTimezoneOffset();
  $HEAPU32$$[$timezone_winterName$$ >>> 0 >>> 2 >>> 0] = 60 * Math.max($winterOffset$jscomp$1$$, $currentYear_summerOffset$jscomp$1$$);
  $HEAP32$$[$daylight_extractZone_summerName$$ >>> 0 >>> 2 >>> 0] = Number($winterOffset$jscomp$1$$ != $currentYear_summerOffset$jscomp$1$$);
  $daylight_extractZone_summerName$$ = $timezoneOffset$$ => {
    var $absOffset$$ = Math.abs($timezoneOffset$$);
    return `UTC${0 <= $timezoneOffset$$ ? "-" : "+"}${String(Math.floor($absOffset$$ / 60)).padStart(2, "0")}${String($absOffset$$ % 60).padStart(2, "0")}`;
  };
  $timezone_winterName$$ = $daylight_extractZone_summerName$$($winterOffset$jscomp$1$$);
  $daylight_extractZone_summerName$$ = $daylight_extractZone_summerName$$($currentYear_summerOffset$jscomp$1$$);
  $assert$$($timezone_winterName$$);
  $assert$$($daylight_extractZone_summerName$$);
  $assert$$(16 >= $lengthBytesUTF8$$($timezone_winterName$$), `timezone name truncated to fit in TZNAME_MAX (${$timezone_winterName$$})`);
  $assert$$(16 >= $lengthBytesUTF8$$($daylight_extractZone_summerName$$), `timezone name truncated to fit in TZNAME_MAX (${$daylight_extractZone_summerName$$})`);
  $currentYear_summerOffset$jscomp$1$$ < $winterOffset$jscomp$1$$ ? ($stringToUTF8$$($timezone_winterName$$, $std_name$$, 17), $stringToUTF8$$($daylight_extractZone_summerName$$, $dst_name$$, 17)) : ($stringToUTF8$$($timezone_winterName$$, $dst_name$$, 17), $stringToUTF8$$($daylight_extractZone_summerName$$, $std_name$$, 17));
}, clock_time_get:function($clk_id$$, $ignored_precision$$, $ptime$$) {
  if (!(0 <= $clk_id$$ && 3 >= $clk_id$$)) {
    return 28;
  }
  $HEAP64$$[$ptime$$ >>> 0 >>> 3 >>> 0] = BigInt(Math.round(1E6 * (0 === $clk_id$$ ? Date.now() : performance.now())));
  return 0;
}, emscripten_asm_const_int_sync_on_main_thread:function($emAsmAddr$jscomp$1$$, $sigPtr$jscomp$2$$, $argbuf$jscomp$1$$) {
  return $runMainThreadEmAsm$$($emAsmAddr$jscomp$1$$ >>> 0, $sigPtr$jscomp$2$$ >>> 0, $argbuf$jscomp$1$$ >>> 0);
}, emscripten_asm_const_ptr_sync_on_main_thread:function($emAsmAddr$jscomp$2$$, $sigPtr$jscomp$3$$, $argbuf$jscomp$2$$) {
  return $runMainThreadEmAsm$$($emAsmAddr$jscomp$2$$ >>> 0, $sigPtr$jscomp$3$$ >>> 0, $argbuf$jscomp$2$$ >>> 0);
}, emscripten_cancel_main_loop:() => {
  $MainLoop$pause$$();
  $MainLoop$func$$ = null;
}, emscripten_date_now:() => Date.now(), emscripten_exit_fullscreen:() => {
  if (!$JSEvents$$.fullscreenEnabled()) {
    return -1;
  }
  $JSCompiler_StaticMethods_removeDeferredCalls$$($JSEvents_requestFullscreen$$);
  var $d$jscomp$1$$ = $specialHTMLTargets$$[1];
  if ($d$jscomp$1$$.exitFullscreen) {
    $d$jscomp$1$$.fullscreenElement && $d$jscomp$1$$.exitFullscreen();
  } else if ($d$jscomp$1$$.webkitExitFullscreen) {
    $d$jscomp$1$$.webkitFullscreenElement && $d$jscomp$1$$.webkitExitFullscreen();
  } else {
    return -1;
  }
  return 0;
}, emscripten_exit_pointerlock:() => {
  $JSCompiler_StaticMethods_removeDeferredCalls$$($requestPointerLock$$);
  if (!document.exitPointerLock) {
    return -1;
  }
  document.exitPointerLock();
  return 0;
}, emscripten_force_exit:$status$jscomp$4$$ => {
  $warnOnce$$("emscripten_force_exit cannot actually shut down the runtime, as the build does not have EXIT_RUNTIME set");
  $noExitRuntime$$ = !1;
  $runtimeKeepaliveCounter$$ = 0;
  $exitJS$$($status$jscomp$4$$);
}, emscripten_get_device_pixel_ratio:() => "number" == typeof devicePixelRatio && devicePixelRatio || 1, emscripten_get_element_css_size:function($rect$jscomp$1_target$jscomp$103$$, $width$jscomp$31$$, $height$jscomp$28$$) {
  $width$jscomp$31$$ >>>= 0;
  $height$jscomp$28$$ >>>= 0;
  $rect$jscomp$1_target$jscomp$103$$ = $findEventTarget$$($rect$jscomp$1_target$jscomp$103$$ >>> 0);
  if (!$rect$jscomp$1_target$jscomp$103$$) {
    return -4;
  }
  $rect$jscomp$1_target$jscomp$103$$ = $getBoundingClientRect$$($rect$jscomp$1_target$jscomp$103$$);
  $HEAPF64$$[$width$jscomp$31$$ >>> 3 >>> 0] = $rect$jscomp$1_target$jscomp$103$$.width;
  $HEAPF64$$[$height$jscomp$28$$ >>> 3 >>> 0] = $rect$jscomp$1_target$jscomp$103$$.height;
  return 0;
}, emscripten_get_gamepad_status:function($index$jscomp$102$$, $gamepadState$$) {
  if (!$JSEvents$$.$lastGamepadState$) {
    throw "emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
  }
  if (0 > $index$jscomp$102$$ || $index$jscomp$102$$ >= $JSEvents$$.$lastGamepadState$.length) {
    return -5;
  }
  if (!$JSEvents$$.$lastGamepadState$[$index$jscomp$102$$]) {
    return -7;
  }
  $fillGamepadEventData$$($gamepadState$$ >>> 0, $JSEvents$$.$lastGamepadState$[$index$jscomp$102$$]);
  return 0;
}, emscripten_get_main_loop_timing:function($mode$jscomp$54$$, $value$jscomp$112$$) {
  $mode$jscomp$54$$ >>>= 0;
  $value$jscomp$112$$ >>>= 0;
  $mode$jscomp$54$$ && ($HEAP32$$[$mode$jscomp$54$$ >>> 2 >>> 0] = $MainLoop$timingMode$$);
  $value$jscomp$112$$ && ($HEAP32$$[$value$jscomp$112$$ >>> 2 >>> 0] = $MainLoop$timingValue$$);
}, emscripten_get_now:() => performance.now(), emscripten_get_num_gamepads:() => {
  if (!$JSEvents$$.$lastGamepadState$) {
    throw "emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
  }
  return $JSEvents$$.$lastGamepadState$.length;
}, emscripten_get_screen_size:function($width$jscomp$33$$, $height$jscomp$30$$) {
  $HEAP32$$[$width$jscomp$33$$ >>> 0 >>> 2 >>> 0] = screen.width;
  $HEAP32$$[$height$jscomp$30$$ >>> 0 >>> 2 >>> 0] = screen.height;
}, emscripten_glActiveTexture:$x0$jscomp$2$$ => $GLctx$$.activeTexture($x0$jscomp$2$$), emscripten_glAttachShader:($program$jscomp$63$$, $shader$jscomp$11$$) => {
  $GLctx$$.attachShader($GL$programs$$[$program$jscomp$63$$], $GL$shaders$$[$shader$jscomp$11$$]);
}, emscripten_glBeginQueryEXT:($target$jscomp$104$$, $id$jscomp$13$$) => {
  $GLctx$$.$disjointTimerQueryExt$.beginQueryEXT($target$jscomp$104$$, $GL$queries$$[$id$jscomp$13$$]);
}, emscripten_glBindAttribLocation:function($program$jscomp$64$$, $index$jscomp$104$$, $name$jscomp$112$$) {
  $GLctx$$.bindAttribLocation($GL$programs$$[$program$jscomp$64$$], $index$jscomp$104$$, $UTF8ToString$$($name$jscomp$112$$ >>> 0));
}, emscripten_glBindBuffer:($target$jscomp$105$$, $buffer$jscomp$42$$) => {
  $GLctx$$.bindBuffer($target$jscomp$105$$, $GL$buffers$$[$buffer$jscomp$42$$]);
}, emscripten_glBindFramebuffer:($target$jscomp$106$$, $framebuffer$jscomp$1$$) => {
  $GLctx$$.bindFramebuffer($target$jscomp$106$$, $GL$framebuffers$$[$framebuffer$jscomp$1$$]);
}, emscripten_glBindRenderbuffer:($target$jscomp$107$$, $renderbuffer$jscomp$2$$) => {
  $GLctx$$.bindRenderbuffer($target$jscomp$107$$, $GL$renderbuffers$$[$renderbuffer$jscomp$2$$]);
}, emscripten_glBindTexture:($target$jscomp$108$$, $texture$jscomp$7$$) => {
  $GLctx$$.bindTexture($target$jscomp$108$$, $GL$textures$$[$texture$jscomp$7$$]);
}, emscripten_glBindVertexArrayOES:$vao$jscomp$3$$ => {
  $GLctx$$.bindVertexArray($GL$vaos$$[$vao$jscomp$3$$]);
}, emscripten_glBlendColor:($x0$jscomp$3$$, $x1$jscomp$5$$, $x2$jscomp$3$$, $x3$$) => $GLctx$$.blendColor($x0$jscomp$3$$, $x1$jscomp$5$$, $x2$jscomp$3$$, $x3$$), emscripten_glBlendEquation:$x0$jscomp$4$$ => $GLctx$$.blendEquation($x0$jscomp$4$$), emscripten_glBlendEquationSeparate:($x0$jscomp$5$$, $x1$jscomp$6$$) => $GLctx$$.blendEquationSeparate($x0$jscomp$5$$, $x1$jscomp$6$$), emscripten_glBlendFunc:($x0$jscomp$6$$, $x1$jscomp$7$$) => $GLctx$$.blendFunc($x0$jscomp$6$$, $x1$jscomp$7$$), emscripten_glBlendFuncSeparate:($x0$jscomp$7$$, 
$x1$jscomp$8$$, $x2$jscomp$4$$, $x3$jscomp$1$$) => $GLctx$$.blendFuncSeparate($x0$jscomp$7$$, $x1$jscomp$8$$, $x2$jscomp$4$$, $x3$jscomp$1$$), emscripten_glBufferData:function($target$jscomp$109$$, $size$jscomp$30$$, $data$jscomp$95$$, $usage$jscomp$2$$) {
  $size$jscomp$30$$ >>>= 0;
  $data$jscomp$95$$ >>>= 0;
  $GLctx$$.bufferData($target$jscomp$109$$, $data$jscomp$95$$ ? $HEAPU8$$.subarray($data$jscomp$95$$ >>> 0, $data$jscomp$95$$ + $size$jscomp$30$$ >>> 0) : $size$jscomp$30$$, $usage$jscomp$2$$);
}, emscripten_glBufferSubData:function($target$jscomp$110$$, $offset$jscomp$84$$, $size$jscomp$31$$, $data$jscomp$96$$) {
  $data$jscomp$96$$ >>>= 0;
  $GLctx$$.bufferSubData($target$jscomp$110$$, $offset$jscomp$84$$ >>> 0, $HEAPU8$$.subarray($data$jscomp$96$$ >>> 0, $data$jscomp$96$$ + ($size$jscomp$31$$ >>> 0) >>> 0));
}, emscripten_glCheckFramebufferStatus:$x0$jscomp$8$$ => $GLctx$$.checkFramebufferStatus($x0$jscomp$8$$), emscripten_glClear:$x0$jscomp$9$$ => $GLctx$$.clear($x0$jscomp$9$$), emscripten_glClearColor:($x0$jscomp$10$$, $x1$jscomp$9$$, $x2$jscomp$5$$, $x3$jscomp$2$$) => $GLctx$$.clearColor($x0$jscomp$10$$, $x1$jscomp$9$$, $x2$jscomp$5$$, $x3$jscomp$2$$), emscripten_glClearDepthf:$x0$jscomp$11$$ => $GLctx$$.clearDepth($x0$jscomp$11$$), emscripten_glClearStencil:$x0$jscomp$12$$ => $GLctx$$.clearStencil($x0$jscomp$12$$), 
emscripten_glClipControlEXT:($origin$jscomp$1$$, $depth$jscomp$9$$) => {
  $GLctx$$.$extClipControl$.clipControlEXT($origin$jscomp$1$$, $depth$jscomp$9$$);
}, emscripten_glColorMask:($red$jscomp$3$$, $green$jscomp$3$$, $blue$jscomp$3$$, $alpha$jscomp$3$$) => {
  $GLctx$$.colorMask(!!$red$jscomp$3$$, !!$green$jscomp$3$$, !!$blue$jscomp$3$$, !!$alpha$jscomp$3$$);
}, emscripten_glCompileShader:$shader$jscomp$12$$ => {
  $GLctx$$.compileShader($GL$shaders$$[$shader$jscomp$12$$]);
}, emscripten_glCompressedTexImage2D:function($target$jscomp$111$$, $level$jscomp$19$$, $internalFormat$$, $width$jscomp$34$$, $height$jscomp$31$$, $border$jscomp$5$$, $imageSize$$, $data$jscomp$97$$) {
  $data$jscomp$97$$ >>>= 0;
  $GLctx$$.compressedTexImage2D($target$jscomp$111$$, $level$jscomp$19$$, $internalFormat$$, $width$jscomp$34$$, $height$jscomp$31$$, $border$jscomp$5$$, $HEAPU8$$.subarray($data$jscomp$97$$ >>> 0, $data$jscomp$97$$ + $imageSize$$ >>> 0));
}, emscripten_glCompressedTexSubImage2D:function($target$jscomp$112$$, $level$jscomp$20$$, $xoffset$jscomp$8$$, $yoffset$jscomp$8$$, $width$jscomp$35$$, $height$jscomp$32$$, $format$jscomp$20$$, $imageSize$jscomp$1$$, $data$jscomp$98$$) {
  $data$jscomp$98$$ >>>= 0;
  $GLctx$$.compressedTexSubImage2D($target$jscomp$112$$, $level$jscomp$20$$, $xoffset$jscomp$8$$, $yoffset$jscomp$8$$, $width$jscomp$35$$, $height$jscomp$32$$, $format$jscomp$20$$, $HEAPU8$$.subarray($data$jscomp$98$$ >>> 0, $data$jscomp$98$$ + $imageSize$jscomp$1$$ >>> 0));
}, emscripten_glCopyTexImage2D:($x0$jscomp$13$$, $x1$jscomp$10$$, $x2$jscomp$6$$, $x3$jscomp$3$$, $x4$$, $x5$$, $x6$$, $x7$$) => $GLctx$$.copyTexImage2D($x0$jscomp$13$$, $x1$jscomp$10$$, $x2$jscomp$6$$, $x3$jscomp$3$$, $x4$$, $x5$$, $x6$$, $x7$$), emscripten_glCopyTexSubImage2D:($x0$jscomp$14$$, $x1$jscomp$11$$, $x2$jscomp$7$$, $x3$jscomp$4$$, $x4$jscomp$1$$, $x5$jscomp$1$$, $x6$jscomp$1$$, $x7$jscomp$1$$) => $GLctx$$.copyTexSubImage2D($x0$jscomp$14$$, $x1$jscomp$11$$, $x2$jscomp$7$$, $x3$jscomp$4$$, 
$x4$jscomp$1$$, $x5$jscomp$1$$, $x6$jscomp$1$$, $x7$jscomp$1$$), emscripten_glCreateProgram:() => {
  var $id$jscomp$14$$ = $GL$getNewId$$($GL$programs$$), $program$jscomp$65$$ = $GLctx$$.createProgram();
  $program$jscomp$65$$.name = $id$jscomp$14$$;
  $program$jscomp$65$$.$maxUniformLength$ = $program$jscomp$65$$.$maxAttributeLength$ = $program$jscomp$65$$.$maxUniformBlockNameLength$ = 0;
  $program$jscomp$65$$.$uniformIdCounter$ = 1;
  $GL$programs$$[$id$jscomp$14$$] = $program$jscomp$65$$;
  return $id$jscomp$14$$;
}, emscripten_glCreateShader:$shaderType$$ => {
  var $id$jscomp$15$$ = $GL$getNewId$$($GL$shaders$$);
  $GL$shaders$$[$id$jscomp$15$$] = $GLctx$$.createShader($shaderType$$);
  return $id$jscomp$15$$;
}, emscripten_glCullFace:$x0$jscomp$15$$ => $GLctx$$.cullFace($x0$jscomp$15$$), emscripten_glDeleteBuffers:function($n$jscomp$7$$, $buffers$jscomp$3$$) {
  $buffers$jscomp$3$$ >>>= 0;
  for (var $i$jscomp$31$$ = 0; $i$jscomp$31$$ < $n$jscomp$7$$; $i$jscomp$31$$++) {
    var $id$jscomp$16$$ = $HEAP32$$[$buffers$jscomp$3$$ + 4 * $i$jscomp$31$$ >>> 2 >>> 0], $buffer$jscomp$43$$ = $GL$buffers$$[$id$jscomp$16$$];
    $buffer$jscomp$43$$ && ($GLctx$$.deleteBuffer($buffer$jscomp$43$$), $buffer$jscomp$43$$.name = 0, $GL$buffers$$[$id$jscomp$16$$] = null);
  }
}, emscripten_glDeleteFramebuffers:function($n$jscomp$8$$, $framebuffers$$) {
  $framebuffers$$ >>>= 0;
  for (var $i$jscomp$32$$ = 0; $i$jscomp$32$$ < $n$jscomp$8$$; ++$i$jscomp$32$$) {
    var $id$jscomp$17$$ = $HEAP32$$[$framebuffers$$ + 4 * $i$jscomp$32$$ >>> 2 >>> 0], $framebuffer$jscomp$2$$ = $GL$framebuffers$$[$id$jscomp$17$$];
    $framebuffer$jscomp$2$$ && ($GLctx$$.deleteFramebuffer($framebuffer$jscomp$2$$), $framebuffer$jscomp$2$$.name = 0, $GL$framebuffers$$[$id$jscomp$17$$] = null);
  }
}, emscripten_glDeleteProgram:$id$jscomp$18$$ => {
  if ($id$jscomp$18$$) {
    var $program$jscomp$66$$ = $GL$programs$$[$id$jscomp$18$$];
    $program$jscomp$66$$ ? ($GLctx$$.deleteProgram($program$jscomp$66$$), $program$jscomp$66$$.name = 0, $GL$programs$$[$id$jscomp$18$$] = null) : $GL$lastError$$ ||= 1281;
  }
}, emscripten_glDeleteQueriesEXT:function($n$jscomp$9$$, $ids$$) {
  $ids$$ >>>= 0;
  for (var $i$jscomp$33$$ = 0; $i$jscomp$33$$ < $n$jscomp$9$$; $i$jscomp$33$$++) {
    var $id$jscomp$19$$ = $HEAP32$$[$ids$$ + 4 * $i$jscomp$33$$ >>> 2 >>> 0], $query$jscomp$13$$ = $GL$queries$$[$id$jscomp$19$$];
    $query$jscomp$13$$ && ($GLctx$$.$disjointTimerQueryExt$.deleteQueryEXT($query$jscomp$13$$), $GL$queries$$[$id$jscomp$19$$] = null);
  }
}, emscripten_glDeleteRenderbuffers:function($n$jscomp$10$$, $renderbuffers$$) {
  $renderbuffers$$ >>>= 0;
  for (var $i$jscomp$34$$ = 0; $i$jscomp$34$$ < $n$jscomp$10$$; $i$jscomp$34$$++) {
    var $id$jscomp$20$$ = $HEAP32$$[$renderbuffers$$ + 4 * $i$jscomp$34$$ >>> 2 >>> 0], $renderbuffer$jscomp$3$$ = $GL$renderbuffers$$[$id$jscomp$20$$];
    $renderbuffer$jscomp$3$$ && ($GLctx$$.deleteRenderbuffer($renderbuffer$jscomp$3$$), $renderbuffer$jscomp$3$$.name = 0, $GL$renderbuffers$$[$id$jscomp$20$$] = null);
  }
}, emscripten_glDeleteShader:$id$jscomp$21$$ => {
  if ($id$jscomp$21$$) {
    var $shader$jscomp$13$$ = $GL$shaders$$[$id$jscomp$21$$];
    $shader$jscomp$13$$ ? ($GLctx$$.deleteShader($shader$jscomp$13$$), $GL$shaders$$[$id$jscomp$21$$] = null) : $GL$lastError$$ ||= 1281;
  }
}, emscripten_glDeleteTextures:function($n$jscomp$11$$, $textures$$) {
  $textures$$ >>>= 0;
  for (var $i$jscomp$35$$ = 0; $i$jscomp$35$$ < $n$jscomp$11$$; $i$jscomp$35$$++) {
    var $id$jscomp$22$$ = $HEAP32$$[$textures$$ + 4 * $i$jscomp$35$$ >>> 2 >>> 0], $texture$jscomp$8$$ = $GL$textures$$[$id$jscomp$22$$];
    $texture$jscomp$8$$ && ($GLctx$$.deleteTexture($texture$jscomp$8$$), $texture$jscomp$8$$.name = 0, $GL$textures$$[$id$jscomp$22$$] = null);
  }
}, emscripten_glDeleteVertexArraysOES:function($n$jscomp$12$$, $vaos$$) {
  $vaos$$ >>>= 0;
  for (var $i$jscomp$36$$ = 0; $i$jscomp$36$$ < $n$jscomp$12$$; $i$jscomp$36$$++) {
    var $id$jscomp$23$$ = $HEAP32$$[$vaos$$ + 4 * $i$jscomp$36$$ >>> 2 >>> 0];
    $GLctx$$.deleteVertexArray($GL$vaos$$[$id$jscomp$23$$]);
    $GL$vaos$$[$id$jscomp$23$$] = null;
  }
}, emscripten_glDepthFunc:$x0$jscomp$16$$ => $GLctx$$.depthFunc($x0$jscomp$16$$), emscripten_glDepthMask:$flag$jscomp$4$$ => {
  $GLctx$$.depthMask(!!$flag$jscomp$4$$);
}, emscripten_glDepthRangef:($x0$jscomp$17$$, $x1$jscomp$12$$) => $GLctx$$.depthRange($x0$jscomp$17$$, $x1$jscomp$12$$), emscripten_glDetachShader:($program$jscomp$67$$, $shader$jscomp$14$$) => {
  $GLctx$$.detachShader($GL$programs$$[$program$jscomp$67$$], $GL$shaders$$[$shader$jscomp$14$$]);
}, emscripten_glDisable:$x0$jscomp$18$$ => $GLctx$$.disable($x0$jscomp$18$$), emscripten_glDisableVertexAttribArray:$index$jscomp$105$$ => {
  $GLctx$$.disableVertexAttribArray($index$jscomp$105$$);
}, emscripten_glDrawArrays:($mode$jscomp$57$$, $first$jscomp$5$$, $count$jscomp$43$$) => {
  $GLctx$$.drawArrays($mode$jscomp$57$$, $first$jscomp$5$$, $count$jscomp$43$$);
}, emscripten_glDrawArraysInstancedANGLE:($mode$jscomp$58$$, $first$jscomp$6$$, $count$jscomp$44$$, $primcount$jscomp$4$$) => {
  $GLctx$$.drawArraysInstanced($mode$jscomp$58$$, $first$jscomp$6$$, $count$jscomp$44$$, $primcount$jscomp$4$$);
}, emscripten_glDrawBuffersWEBGL:function($n$jscomp$13$$, $bufs$jscomp$1$$) {
  $bufs$jscomp$1$$ >>>= 0;
  for (var $bufArray$$ = $tempFixedLengthArray$$[$n$jscomp$13$$], $i$jscomp$37$$ = 0; $i$jscomp$37$$ < $n$jscomp$13$$; $i$jscomp$37$$++) {
    $bufArray$$[$i$jscomp$37$$] = $HEAP32$$[$bufs$jscomp$1$$ + 4 * $i$jscomp$37$$ >>> 2 >>> 0];
  }
  $GLctx$$.drawBuffers($bufArray$$);
}, emscripten_glDrawElements:function($mode$jscomp$59$$, $count$jscomp$45$$, $type$jscomp$178$$, $indices$jscomp$1$$) {
  $GLctx$$.drawElements($mode$jscomp$59$$, $count$jscomp$45$$, $type$jscomp$178$$, $indices$jscomp$1$$ >>> 0);
}, emscripten_glDrawElementsInstancedANGLE:function($mode$jscomp$60$$, $count$jscomp$46$$, $type$jscomp$179$$, $indices$jscomp$2$$, $primcount$jscomp$5$$) {
  $GLctx$$.drawElementsInstanced($mode$jscomp$60$$, $count$jscomp$46$$, $type$jscomp$179$$, $indices$jscomp$2$$ >>> 0, $primcount$jscomp$5$$);
}, emscripten_glEnable:$x0$jscomp$19$$ => $GLctx$$.enable($x0$jscomp$19$$), emscripten_glEnableVertexAttribArray:$index$jscomp$106$$ => {
  $GLctx$$.enableVertexAttribArray($index$jscomp$106$$);
}, emscripten_glEndQueryEXT:$target$jscomp$113$$ => {
  $GLctx$$.$disjointTimerQueryExt$.endQueryEXT($target$jscomp$113$$);
}, emscripten_glFinish:() => $GLctx$$.finish(), emscripten_glFlush:() => $GLctx$$.flush(), emscripten_glFramebufferRenderbuffer:($target$jscomp$114$$, $attachment$jscomp$4$$, $renderbuffertarget$jscomp$1$$, $renderbuffer$jscomp$4$$) => {
  $GLctx$$.framebufferRenderbuffer($target$jscomp$114$$, $attachment$jscomp$4$$, $renderbuffertarget$jscomp$1$$, $GL$renderbuffers$$[$renderbuffer$jscomp$4$$]);
}, emscripten_glFramebufferTexture2D:($target$jscomp$115$$, $attachment$jscomp$5$$, $textarget$jscomp$1$$, $texture$jscomp$9$$, $level$jscomp$21$$) => {
  $GLctx$$.framebufferTexture2D($target$jscomp$115$$, $attachment$jscomp$5$$, $textarget$jscomp$1$$, $GL$textures$$[$texture$jscomp$9$$], $level$jscomp$21$$);
}, emscripten_glFrontFace:$x0$jscomp$20$$ => $GLctx$$.frontFace($x0$jscomp$20$$), emscripten_glGenBuffers:function($n$jscomp$14$$, $buffers$jscomp$4$$) {
  $GL$genObject$$($n$jscomp$14$$, $buffers$jscomp$4$$ >>> 0, "createBuffer", $GL$buffers$$);
}, emscripten_glGenFramebuffers:function($n$jscomp$15$$, $ids$jscomp$1$$) {
  $GL$genObject$$($n$jscomp$15$$, $ids$jscomp$1$$ >>> 0, "createFramebuffer", $GL$framebuffers$$);
}, emscripten_glGenQueriesEXT:function($n$jscomp$16$$, $ids$jscomp$2$$) {
  $ids$jscomp$2$$ >>>= 0;
  for (var $i$jscomp$38$$ = 0; $i$jscomp$38$$ < $n$jscomp$16$$; $i$jscomp$38$$++) {
    var $query$jscomp$14$$ = $GLctx$$.$disjointTimerQueryExt$.createQueryEXT();
    if (!$query$jscomp$14$$) {
      for ($GL$lastError$$ ||= 1282; $i$jscomp$38$$ < $n$jscomp$16$$;) {
        $HEAP32$$[$ids$jscomp$2$$ + 4 * $i$jscomp$38$$++ >>> 2 >>> 0] = 0;
      }
      break;
    }
    var $id$jscomp$24$$ = $GL$getNewId$$($GL$queries$$);
    $query$jscomp$14$$.name = $id$jscomp$24$$;
    $GL$queries$$[$id$jscomp$24$$] = $query$jscomp$14$$;
    $HEAP32$$[$ids$jscomp$2$$ + 4 * $i$jscomp$38$$ >>> 2 >>> 0] = $id$jscomp$24$$;
  }
}, emscripten_glGenRenderbuffers:function($n$jscomp$17$$, $renderbuffers$jscomp$1$$) {
  $GL$genObject$$($n$jscomp$17$$, $renderbuffers$jscomp$1$$ >>> 0, "createRenderbuffer", $GL$renderbuffers$$);
}, emscripten_glGenTextures:function($n$jscomp$18$$, $textures$jscomp$1$$) {
  $GL$genObject$$($n$jscomp$18$$, $textures$jscomp$1$$ >>> 0, "createTexture", $GL$textures$$);
}, emscripten_glGenVertexArraysOES:function($n$jscomp$19$$, $arrays$$) {
  $GL$genObject$$($n$jscomp$19$$, $arrays$$ >>> 0, "createVertexArray", $GL$vaos$$);
}, emscripten_glGenerateMipmap:$x0$jscomp$21$$ => $GLctx$$.generateMipmap($x0$jscomp$21$$), emscripten_glGetActiveAttrib:function($program$jscomp$69$$, $index$jscomp$108$$, $bufSize$jscomp$1$$, $length$jscomp$46$$, $size$jscomp$33$$, $type$jscomp$181$$, $name$jscomp$114$$) {
  return $__glGetActiveAttribOrUniform$$("getActiveAttrib", $program$jscomp$69$$, $index$jscomp$108$$, $bufSize$jscomp$1$$, $length$jscomp$46$$ >>> 0, $size$jscomp$33$$ >>> 0, $type$jscomp$181$$ >>> 0, $name$jscomp$114$$ >>> 0);
}, emscripten_glGetActiveUniform:function($program$jscomp$70$$, $index$jscomp$109$$, $bufSize$jscomp$2$$, $length$jscomp$47$$, $size$jscomp$34$$, $type$jscomp$182$$, $name$jscomp$115$$) {
  return $__glGetActiveAttribOrUniform$$("getActiveUniform", $program$jscomp$70$$, $index$jscomp$109$$, $bufSize$jscomp$2$$, $length$jscomp$47$$ >>> 0, $size$jscomp$34$$ >>> 0, $type$jscomp$182$$ >>> 0, $name$jscomp$115$$ >>> 0);
}, emscripten_glGetAttachedShaders:function($program$jscomp$71_result$jscomp$7$$, $i$jscomp$39_maxCount$$, $count$jscomp$47$$, $shaders$$) {
  $shaders$$ >>>= 0;
  $program$jscomp$71_result$jscomp$7$$ = $GLctx$$.getAttachedShaders($GL$programs$$[$program$jscomp$71_result$jscomp$7$$]);
  var $len$jscomp$12$$ = $program$jscomp$71_result$jscomp$7$$.length;
  $len$jscomp$12$$ > $i$jscomp$39_maxCount$$ && ($len$jscomp$12$$ = $i$jscomp$39_maxCount$$);
  $HEAP32$$[$count$jscomp$47$$ >>> 0 >>> 2 >>> 0] = $len$jscomp$12$$;
  for ($i$jscomp$39_maxCount$$ = 0; $i$jscomp$39_maxCount$$ < $len$jscomp$12$$; ++$i$jscomp$39_maxCount$$) {
    $HEAP32$$[$shaders$$ + 4 * $i$jscomp$39_maxCount$$ >>> 2 >>> 0] = $GL$shaders$$.indexOf($program$jscomp$71_result$jscomp$7$$[$i$jscomp$39_maxCount$$]);
  }
}, emscripten_glGetAttribLocation:function($program$jscomp$72$$, $name$jscomp$116$$) {
  return $GLctx$$.getAttribLocation($GL$programs$$[$program$jscomp$72$$], $UTF8ToString$$($name$jscomp$116$$ >>> 0));
}, emscripten_glGetBooleanv:function($name_$jscomp$1$$, $p$jscomp$8$$) {
  return $emscriptenWebGLGet$$($name_$jscomp$1$$, $p$jscomp$8$$ >>> 0, 4);
}, emscripten_glGetBufferParameteriv:function($target$jscomp$116$$, $value$jscomp$113$$, $data$jscomp$99$$) {
  ($data$jscomp$99$$ >>>= 0) ? $HEAP32$$[$data$jscomp$99$$ >>> 2 >>> 0] = $GLctx$$.getBufferParameter($target$jscomp$116$$, $value$jscomp$113$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetError:() => {
  var $error$jscomp$5$$ = $GLctx$$.getError() || $GL$lastError$$;
  $GL$lastError$$ = 0;
  return $error$jscomp$5$$;
}, emscripten_glGetFloatv:function($name_$jscomp$2$$, $p$jscomp$9$$) {
  return $emscriptenWebGLGet$$($name_$jscomp$2$$, $p$jscomp$9$$ >>> 0, 2);
}, emscripten_glGetFramebufferAttachmentParameteriv:function($result$jscomp$9_target$jscomp$117$$, $attachment$jscomp$6$$, $pname$jscomp$26$$, $params$jscomp$1$$) {
  $result$jscomp$9_target$jscomp$117$$ = $GLctx$$.getFramebufferAttachmentParameter($result$jscomp$9_target$jscomp$117$$, $attachment$jscomp$6$$, $pname$jscomp$26$$);
  if ($result$jscomp$9_target$jscomp$117$$ instanceof WebGLRenderbuffer || $result$jscomp$9_target$jscomp$117$$ instanceof WebGLTexture) {
    $result$jscomp$9_target$jscomp$117$$ = $result$jscomp$9_target$jscomp$117$$.name | 0;
  }
  $HEAP32$$[$params$jscomp$1$$ >>> 0 >>> 2 >>> 0] = $result$jscomp$9_target$jscomp$117$$;
}, emscripten_glGetIntegerv:function($name_$jscomp$3$$, $p$jscomp$10$$) {
  return $emscriptenWebGLGet$$($name_$jscomp$3$$, $p$jscomp$10$$ >>> 0, 0);
}, emscripten_glGetProgramInfoLog:function($log_program$jscomp$73$$, $maxLength_numBytesWrittenExclNull$jscomp$1$$, $length$jscomp$48$$, $infoLog$$) {
  $length$jscomp$48$$ >>>= 0;
  $infoLog$$ >>>= 0;
  $log_program$jscomp$73$$ = $GLctx$$.getProgramInfoLog($GL$programs$$[$log_program$jscomp$73$$]);
  null === $log_program$jscomp$73$$ && ($log_program$jscomp$73$$ = "(unknown error)");
  $maxLength_numBytesWrittenExclNull$jscomp$1$$ = 0 < $maxLength_numBytesWrittenExclNull$jscomp$1$$ && $infoLog$$ ? $stringToUTF8$$($log_program$jscomp$73$$, $infoLog$$, $maxLength_numBytesWrittenExclNull$jscomp$1$$) : 0;
  $length$jscomp$48$$ && ($HEAP32$$[$length$jscomp$48$$ >>> 2 >>> 0] = $maxLength_numBytesWrittenExclNull$jscomp$1$$);
}, emscripten_glGetProgramiv:function($log$jscomp$1_program$jscomp$74$$, $i$jscomp$41_pname$jscomp$27$$, $p$jscomp$11$$) {
  if ($p$jscomp$11$$ >>>= 0) {
    if ($log$jscomp$1_program$jscomp$74$$ >= $GL$counter$$) {
      $GL$lastError$$ ||= 1281;
    } else {
      if ($log$jscomp$1_program$jscomp$74$$ = $GL$programs$$[$log$jscomp$1_program$jscomp$74$$], 35716 == $i$jscomp$41_pname$jscomp$27$$) {
        $log$jscomp$1_program$jscomp$74$$ = $GLctx$$.getProgramInfoLog($log$jscomp$1_program$jscomp$74$$), null === $log$jscomp$1_program$jscomp$74$$ && ($log$jscomp$1_program$jscomp$74$$ = "(unknown error)"), $HEAP32$$[$p$jscomp$11$$ >>> 2 >>> 0] = $log$jscomp$1_program$jscomp$74$$.length + 1;
      } else if (35719 == $i$jscomp$41_pname$jscomp$27$$) {
        if (!$log$jscomp$1_program$jscomp$74$$.$maxUniformLength$) {
          var $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, 35718);
          for ($i$jscomp$41_pname$jscomp$27$$ = 0; $i$jscomp$41_pname$jscomp$27$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$41_pname$jscomp$27$$) {
            $log$jscomp$1_program$jscomp$74$$.$maxUniformLength$ = Math.max($log$jscomp$1_program$jscomp$74$$.$maxUniformLength$, $GLctx$$.getActiveUniform($log$jscomp$1_program$jscomp$74$$, $i$jscomp$41_pname$jscomp$27$$).name.length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$11$$ >>> 2 >>> 0] = $log$jscomp$1_program$jscomp$74$$.$maxUniformLength$;
      } else if (35722 == $i$jscomp$41_pname$jscomp$27$$) {
        if (!$log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$) {
          for ($numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, 35721), $i$jscomp$41_pname$jscomp$27$$ = 0; $i$jscomp$41_pname$jscomp$27$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$41_pname$jscomp$27$$) {
            $log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$ = Math.max($log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$, $GLctx$$.getActiveAttrib($log$jscomp$1_program$jscomp$74$$, $i$jscomp$41_pname$jscomp$27$$).name.length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$11$$ >>> 2 >>> 0] = $log$jscomp$1_program$jscomp$74$$.$maxAttributeLength$;
      } else if (35381 == $i$jscomp$41_pname$jscomp$27$$) {
        if (!$log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$) {
          for ($numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$ = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, 35382), $i$jscomp$41_pname$jscomp$27$$ = 0; $i$jscomp$41_pname$jscomp$27$$ < $numActiveAttributes_numActiveUniformBlocks_numActiveUniforms$$; ++$i$jscomp$41_pname$jscomp$27$$) {
            $log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$ = Math.max($log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$, $GLctx$$.getActiveUniformBlockName($log$jscomp$1_program$jscomp$74$$, $i$jscomp$41_pname$jscomp$27$$).length + 1);
          }
        }
        $HEAP32$$[$p$jscomp$11$$ >>> 2 >>> 0] = $log$jscomp$1_program$jscomp$74$$.$maxUniformBlockNameLength$;
      } else {
        $HEAP32$$[$p$jscomp$11$$ >>> 2 >>> 0] = $GLctx$$.getProgramParameter($log$jscomp$1_program$jscomp$74$$, $i$jscomp$41_pname$jscomp$27$$);
      }
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
}, emscripten_glGetQueryObjecti64vEXT:$_glGetQueryObjecti64vEXT$$, emscripten_glGetQueryObjectivEXT:$_glGetQueryObjectivEXT$$, emscripten_glGetQueryObjectui64vEXT:$_glGetQueryObjecti64vEXT$$, emscripten_glGetQueryObjectuivEXT:$_glGetQueryObjectivEXT$$, emscripten_glGetQueryivEXT:function($target$jscomp$118$$, $pname$jscomp$30$$, $params$jscomp$4$$) {
  ($params$jscomp$4$$ >>>= 0) ? $HEAP32$$[$params$jscomp$4$$ >>> 2 >>> 0] = $GLctx$$.$disjointTimerQueryExt$.getQueryEXT($target$jscomp$118$$, $pname$jscomp$30$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetRenderbufferParameteriv:function($target$jscomp$119$$, $pname$jscomp$31$$, $params$jscomp$5$$) {
  ($params$jscomp$5$$ >>>= 0) ? $HEAP32$$[$params$jscomp$5$$ >>> 2 >>> 0] = $GLctx$$.getRenderbufferParameter($target$jscomp$119$$, $pname$jscomp$31$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetShaderInfoLog:function($log$jscomp$2_shader$jscomp$15$$, $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$, $length$jscomp$49$$, $infoLog$jscomp$1$$) {
  $length$jscomp$49$$ >>>= 0;
  $infoLog$jscomp$1$$ >>>= 0;
  $log$jscomp$2_shader$jscomp$15$$ = $GLctx$$.getShaderInfoLog($GL$shaders$$[$log$jscomp$2_shader$jscomp$15$$]);
  null === $log$jscomp$2_shader$jscomp$15$$ && ($log$jscomp$2_shader$jscomp$15$$ = "(unknown error)");
  $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$ = 0 < $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$ && $infoLog$jscomp$1$$ ? $stringToUTF8$$($log$jscomp$2_shader$jscomp$15$$, $infoLog$jscomp$1$$, $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$) : 0;
  $length$jscomp$49$$ && ($HEAP32$$[$length$jscomp$49$$ >>> 2 >>> 0] = $maxLength$jscomp$1_numBytesWrittenExclNull$jscomp$2$$);
}, emscripten_glGetShaderPrecisionFormat:function($result$jscomp$10_shaderType$jscomp$1$$, $precisionType$$, $range$jscomp$5$$, $precision$$) {
  $range$jscomp$5$$ >>>= 0;
  $result$jscomp$10_shaderType$jscomp$1$$ = $GLctx$$.getShaderPrecisionFormat($result$jscomp$10_shaderType$jscomp$1$$, $precisionType$$);
  $HEAP32$$[$range$jscomp$5$$ >>> 2 >>> 0] = $result$jscomp$10_shaderType$jscomp$1$$.rangeMin;
  $HEAP32$$[$range$jscomp$5$$ + 4 >>> 2 >>> 0] = $result$jscomp$10_shaderType$jscomp$1$$.rangeMax;
  $HEAP32$$[$precision$$ >>> 0 >>> 2 >>> 0] = $result$jscomp$10_shaderType$jscomp$1$$.precision;
}, emscripten_glGetShaderSource:function($result$jscomp$11_shader$jscomp$16$$, $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$, $length$jscomp$50$$, $source$jscomp$18$$) {
  $length$jscomp$50$$ >>>= 0;
  $source$jscomp$18$$ >>>= 0;
  if ($result$jscomp$11_shader$jscomp$16$$ = $GLctx$$.getShaderSource($GL$shaders$$[$result$jscomp$11_shader$jscomp$16$$])) {
    $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$ = 0 < $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$ && $source$jscomp$18$$ ? $stringToUTF8$$($result$jscomp$11_shader$jscomp$16$$, $source$jscomp$18$$, $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$) : 0, $length$jscomp$50$$ && ($HEAP32$$[$length$jscomp$50$$ >>> 2 >>> 0] = $bufSize$jscomp$3_numBytesWrittenExclNull$jscomp$3$$);
  }
}, emscripten_glGetShaderiv:function($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$, $pname$jscomp$32$$, $p$jscomp$12$$) {
  ($p$jscomp$12$$ >>>= 0) ? 35716 == $pname$jscomp$32$$ ? ($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ = $GLctx$$.getShaderInfoLog($GL$shaders$$[$log$jscomp$3_shader$jscomp$17_source$jscomp$19$$]), null === $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ && ($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ = "(unknown error)"), $HEAP32$$[$p$jscomp$12$$ >>> 2 >>> 0] = $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ ? $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$.length + 1 : 0) : 35720 == 
  $pname$jscomp$32$$ ? ($log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ = $GLctx$$.getShaderSource($GL$shaders$$[$log$jscomp$3_shader$jscomp$17_source$jscomp$19$$]), $HEAP32$$[$p$jscomp$12$$ >>> 2 >>> 0] = $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$ ? $log$jscomp$3_shader$jscomp$17_source$jscomp$19$$.length + 1 : 0) : $HEAP32$$[$p$jscomp$12$$ >>> 2 >>> 0] = $GLctx$$.getShaderParameter($GL$shaders$$[$log$jscomp$3_shader$jscomp$17_source$jscomp$19$$], $pname$jscomp$32$$) : $GL$lastError$$ ||= 
  1281;
}, emscripten_glGetString:function($name_$jscomp$4$$) {
  var $glslVersion_ret$jscomp$15_s$jscomp$6$$ = $GL$stringCache$$[$name_$jscomp$4$$];
  if (!$glslVersion_ret$jscomp$15_s$jscomp$6$$) {
    switch($name_$jscomp$4$$) {
      case 7939:
        $glslVersion_ret$jscomp$15_s$jscomp$6$$ = $stringToNewUTF8$$($webglGetExtensions$$().join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        ($glslVersion_ret$jscomp$15_s$jscomp$6$$ = $GLctx$$.getParameter($name_$jscomp$4$$)) || ($GL$lastError$$ ||= 1280);
        $glslVersion_ret$jscomp$15_s$jscomp$6$$ = $glslVersion_ret$jscomp$15_s$jscomp$6$$ ? $stringToNewUTF8$$($glslVersion_ret$jscomp$15_s$jscomp$6$$) : 0;
        break;
      case 7938:
        $glslVersion_ret$jscomp$15_s$jscomp$6$$ = $stringToNewUTF8$$(`OpenGL ES 2.0 (${$GLctx$$.getParameter(7938)})`);
        break;
      case 35724:
        $glslVersion_ret$jscomp$15_s$jscomp$6$$ = $GLctx$$.getParameter(35724);
        var $ver_num$$ = $glslVersion_ret$jscomp$15_s$jscomp$6$$.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== $ver_num$$ && (3 == $ver_num$$[1].length && ($ver_num$$[1] += "0"), $glslVersion_ret$jscomp$15_s$jscomp$6$$ = `OpenGL ES GLSL ES ${$ver_num$$[1]} (${$glslVersion_ret$jscomp$15_s$jscomp$6$$})`);
        $glslVersion_ret$jscomp$15_s$jscomp$6$$ = $stringToNewUTF8$$($glslVersion_ret$jscomp$15_s$jscomp$6$$);
        break;
      default:
        $GL$lastError$$ ||= 1280;
    }
    $GL$stringCache$$[$name_$jscomp$4$$] = $glslVersion_ret$jscomp$15_s$jscomp$6$$;
  }
  return $glslVersion_ret$jscomp$15_s$jscomp$6$$;
}, emscripten_glGetTexParameterfv:function($target$jscomp$120$$, $pname$jscomp$33$$, $params$jscomp$6$$) {
  ($params$jscomp$6$$ >>>= 0) ? $HEAPF32$$[$params$jscomp$6$$ >>> 2 >>> 0] = $GLctx$$.getTexParameter($target$jscomp$120$$, $pname$jscomp$33$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetTexParameteriv:function($target$jscomp$121$$, $pname$jscomp$34$$, $params$jscomp$7$$) {
  ($params$jscomp$7$$ >>>= 0) ? $HEAP32$$[$params$jscomp$7$$ >>> 2 >>> 0] = $GLctx$$.getTexParameter($target$jscomp$121$$, $pname$jscomp$34$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetUniformLocation:function($program$jscomp$76$$, $name$jscomp$118$$) {
  $name$jscomp$118$$ = $UTF8ToString$$($name$jscomp$118$$ >>> 0);
  if ($program$jscomp$76$$ = $GL$programs$$[$program$jscomp$76$$]) {
    $webglPrepareUniformLocationsBeforeFirstUse$$($program$jscomp$76$$);
    var $uniformLocsById$jscomp$1$$ = $program$jscomp$76$$.$uniformLocsById$, $arrayIndex$$ = 0, $sizeAndId_uniformBaseName$$ = $name$jscomp$118$$, $leftBrace$$ = $webglGetLeftBracePos$$($name$jscomp$118$$);
    0 < $leftBrace$$ && ($arrayIndex$$ = parseInt($name$jscomp$118$$.slice($leftBrace$$ + 1)) >>> 0, $sizeAndId_uniformBaseName$$ = $name$jscomp$118$$.slice(0, $leftBrace$$));
    if (($sizeAndId_uniformBaseName$$ = $program$jscomp$76$$.$uniformSizeAndIdsByName$[$sizeAndId_uniformBaseName$$]) && $arrayIndex$$ < $sizeAndId_uniformBaseName$$[0] && ($arrayIndex$$ += $sizeAndId_uniformBaseName$$[1], $uniformLocsById$jscomp$1$$[$arrayIndex$$] = $uniformLocsById$jscomp$1$$[$arrayIndex$$] || $GLctx$$.getUniformLocation($program$jscomp$76$$, $name$jscomp$118$$))) {
      return $arrayIndex$$;
    }
  } else {
    $GL$lastError$$ ||= 1281;
  }
  return -1;
}, emscripten_glGetUniformfv:function($program$jscomp$78$$, $location$jscomp$81$$, $params$jscomp$9$$) {
  $emscriptenWebGLGetUniform$$($program$jscomp$78$$, $location$jscomp$81$$, $params$jscomp$9$$ >>> 0, 2);
}, emscripten_glGetUniformiv:function($program$jscomp$79$$, $location$jscomp$82$$, $params$jscomp$10$$) {
  $emscriptenWebGLGetUniform$$($program$jscomp$79$$, $location$jscomp$82$$, $params$jscomp$10$$ >>> 0, 0);
}, emscripten_glGetVertexAttribPointerv:function($index$jscomp$110$$, $pname$jscomp$35$$, $pointer$$) {
  ($pointer$$ >>>= 0) ? $HEAP32$$[$pointer$$ >>> 2 >>> 0] = $GLctx$$.getVertexAttribOffset($index$jscomp$110$$, $pname$jscomp$35$$) : $GL$lastError$$ ||= 1281;
}, emscripten_glGetVertexAttribfv:function($index$jscomp$112$$, $pname$jscomp$37$$, $params$jscomp$12$$) {
  $emscriptenWebGLGetVertexAttrib$$($index$jscomp$112$$, $pname$jscomp$37$$, $params$jscomp$12$$ >>> 0, 2);
}, emscripten_glGetVertexAttribiv:function($index$jscomp$113$$, $pname$jscomp$38$$, $params$jscomp$13$$) {
  $emscriptenWebGLGetVertexAttrib$$($index$jscomp$113$$, $pname$jscomp$38$$, $params$jscomp$13$$ >>> 0, 5);
}, emscripten_glHint:($x0$jscomp$22$$, $x1$jscomp$13$$) => $GLctx$$.hint($x0$jscomp$22$$, $x1$jscomp$13$$), emscripten_glIsBuffer:$b$jscomp$4_buffer$jscomp$44$$ => ($b$jscomp$4_buffer$jscomp$44$$ = $GL$buffers$$[$b$jscomp$4_buffer$jscomp$44$$]) ? $GLctx$$.isBuffer($b$jscomp$4_buffer$jscomp$44$$) : 0, emscripten_glIsEnabled:$x0$jscomp$23$$ => $GLctx$$.isEnabled($x0$jscomp$23$$), emscripten_glIsFramebuffer:$fb_framebuffer$jscomp$3$$ => ($fb_framebuffer$jscomp$3$$ = $GL$framebuffers$$[$fb_framebuffer$jscomp$3$$]) ? 
$GLctx$$.isFramebuffer($fb_framebuffer$jscomp$3$$) : 0, emscripten_glIsProgram:$program$jscomp$80$$ => ($program$jscomp$80$$ = $GL$programs$$[$program$jscomp$80$$]) ? $GLctx$$.isProgram($program$jscomp$80$$) : 0, emscripten_glIsQueryEXT:$id$jscomp$29_query$jscomp$17$$ => ($id$jscomp$29_query$jscomp$17$$ = $GL$queries$$[$id$jscomp$29_query$jscomp$17$$]) ? $GLctx$$.$disjointTimerQueryExt$.isQueryEXT($id$jscomp$29_query$jscomp$17$$) : 0, emscripten_glIsRenderbuffer:$rb_renderbuffer$jscomp$5$$ => ($rb_renderbuffer$jscomp$5$$ = 
$GL$renderbuffers$$[$rb_renderbuffer$jscomp$5$$]) ? $GLctx$$.isRenderbuffer($rb_renderbuffer$jscomp$5$$) : 0, emscripten_glIsShader:$s$jscomp$7_shader$jscomp$18$$ => ($s$jscomp$7_shader$jscomp$18$$ = $GL$shaders$$[$s$jscomp$7_shader$jscomp$18$$]) ? $GLctx$$.isShader($s$jscomp$7_shader$jscomp$18$$) : 0, emscripten_glIsTexture:$id$jscomp$30_texture$jscomp$10$$ => ($id$jscomp$30_texture$jscomp$10$$ = $GL$textures$$[$id$jscomp$30_texture$jscomp$10$$]) ? $GLctx$$.isTexture($id$jscomp$30_texture$jscomp$10$$) : 
0, emscripten_glIsVertexArrayOES:$array$jscomp$6_vao$jscomp$4$$ => ($array$jscomp$6_vao$jscomp$4$$ = $GL$vaos$$[$array$jscomp$6_vao$jscomp$4$$]) ? $GLctx$$.isVertexArray($array$jscomp$6_vao$jscomp$4$$) : 0, emscripten_glLineWidth:$x0$jscomp$24$$ => $GLctx$$.lineWidth($x0$jscomp$24$$), emscripten_glLinkProgram:$program$jscomp$81$$ => {
  $program$jscomp$81$$ = $GL$programs$$[$program$jscomp$81$$];
  $GLctx$$.linkProgram($program$jscomp$81$$);
  $program$jscomp$81$$.$uniformLocsById$ = 0;
  $program$jscomp$81$$.$uniformSizeAndIdsByName$ = {};
}, emscripten_glPixelStorei:($pname$jscomp$39$$, $param$jscomp$9$$) => {
  3317 == $pname$jscomp$39$$ ? $GL$unpackAlignment$$ = $param$jscomp$9$$ : 3314 == $pname$jscomp$39$$ && ($GL$unpackRowLength$$ = $param$jscomp$9$$);
  $GLctx$$.pixelStorei($pname$jscomp$39$$, $param$jscomp$9$$);
}, emscripten_glPolygonModeWEBGL:($face$jscomp$3$$, $mode$jscomp$61$$) => {
  $GLctx$$.$webglPolygonMode$.polygonModeWEBGL($face$jscomp$3$$, $mode$jscomp$61$$);
}, emscripten_glPolygonOffset:($x0$jscomp$25$$, $x1$jscomp$14$$) => $GLctx$$.polygonOffset($x0$jscomp$25$$, $x1$jscomp$14$$), emscripten_glPolygonOffsetClampEXT:($factor$jscomp$2$$, $units$jscomp$1$$, $clamp$$) => {
  $GLctx$$.$extPolygonOffsetClamp$.polygonOffsetClampEXT($factor$jscomp$2$$, $units$jscomp$1$$, $clamp$$);
}, emscripten_glQueryCounterEXT:($id$jscomp$31$$, $target$jscomp$122$$) => {
  $GLctx$$.$disjointTimerQueryExt$.queryCounterEXT($GL$queries$$[$id$jscomp$31$$], $target$jscomp$122$$);
}, emscripten_glReadPixels:function($x$jscomp$95$$, $y$jscomp$80$$, $width$jscomp$38$$, $height$jscomp$35$$, $format$jscomp$23$$, $type$jscomp$188$$, $pixelData_pixels$jscomp$2$$) {
  ($pixelData_pixels$jscomp$2$$ = $emscriptenWebGLGetTexPixelData$$($type$jscomp$188$$, $format$jscomp$23$$, $width$jscomp$38$$, $height$jscomp$35$$, $pixelData_pixels$jscomp$2$$ >>> 0)) ? $GLctx$$.readPixels($x$jscomp$95$$, $y$jscomp$80$$, $width$jscomp$38$$, $height$jscomp$35$$, $format$jscomp$23$$, $type$jscomp$188$$, $pixelData_pixels$jscomp$2$$) : $GL$lastError$$ ||= 1280;
}, emscripten_glReleaseShaderCompiler:() => {
}, emscripten_glRenderbufferStorage:($x0$jscomp$26$$, $x1$jscomp$15$$, $x2$jscomp$8$$, $x3$jscomp$5$$) => $GLctx$$.renderbufferStorage($x0$jscomp$26$$, $x1$jscomp$15$$, $x2$jscomp$8$$, $x3$jscomp$5$$), emscripten_glSampleCoverage:($value$jscomp$114$$, $invert$jscomp$1$$) => {
  $GLctx$$.sampleCoverage($value$jscomp$114$$, !!$invert$jscomp$1$$);
}, emscripten_glScissor:($x0$jscomp$27$$, $x1$jscomp$16$$, $x2$jscomp$9$$, $x3$jscomp$6$$) => $GLctx$$.scissor($x0$jscomp$27$$, $x1$jscomp$16$$, $x2$jscomp$9$$, $x3$jscomp$6$$), emscripten_glShaderBinary:function() {
  $GL$lastError$$ ||= 1280;
}, emscripten_glShaderSource:function($shader$jscomp$19$$, $count$jscomp$49$$, $string$jscomp$15_string$jscomp$inline_283$$, $length$jscomp$52_length$jscomp$inline_284$$) {
  $string$jscomp$15_string$jscomp$inline_283$$ >>>= 0;
  $length$jscomp$52_length$jscomp$inline_284$$ >>>= 0;
  for (var $source$jscomp$inline_285$$ = "", $i$jscomp$inline_286$$ = 0; $i$jscomp$inline_286$$ < $count$jscomp$49$$; ++$i$jscomp$inline_286$$) {
    $source$jscomp$inline_285$$ += $UTF8ToString$$($HEAPU32$$[$string$jscomp$15_string$jscomp$inline_283$$ + 4 * $i$jscomp$inline_286$$ >>> 2 >>> 0], $length$jscomp$52_length$jscomp$inline_284$$ ? $HEAPU32$$[$length$jscomp$52_length$jscomp$inline_284$$ + 4 * $i$jscomp$inline_286$$ >>> 2 >>> 0] : void 0);
  }
  $GLctx$$.shaderSource($GL$shaders$$[$shader$jscomp$19$$], $source$jscomp$inline_285$$);
}, emscripten_glStencilFunc:($x0$jscomp$28$$, $x1$jscomp$17$$, $x2$jscomp$10$$) => $GLctx$$.stencilFunc($x0$jscomp$28$$, $x1$jscomp$17$$, $x2$jscomp$10$$), emscripten_glStencilFuncSeparate:($x0$jscomp$29$$, $x1$jscomp$18$$, $x2$jscomp$11$$, $x3$jscomp$7$$) => $GLctx$$.stencilFuncSeparate($x0$jscomp$29$$, $x1$jscomp$18$$, $x2$jscomp$11$$, $x3$jscomp$7$$), emscripten_glStencilMask:$x0$jscomp$30$$ => $GLctx$$.stencilMask($x0$jscomp$30$$), emscripten_glStencilMaskSeparate:($x0$jscomp$31$$, $x1$jscomp$19$$) => 
$GLctx$$.stencilMaskSeparate($x0$jscomp$31$$, $x1$jscomp$19$$), emscripten_glStencilOp:($x0$jscomp$32$$, $x1$jscomp$20$$, $x2$jscomp$12$$) => $GLctx$$.stencilOp($x0$jscomp$32$$, $x1$jscomp$20$$, $x2$jscomp$12$$), emscripten_glStencilOpSeparate:($x0$jscomp$33$$, $x1$jscomp$21$$, $x2$jscomp$13$$, $x3$jscomp$8$$) => $GLctx$$.stencilOpSeparate($x0$jscomp$33$$, $x1$jscomp$21$$, $x2$jscomp$13$$, $x3$jscomp$8$$), emscripten_glTexImage2D:function($target$jscomp$123$$, $level$jscomp$22$$, $internalFormat$jscomp$2$$, 
$width$jscomp$39$$, $height$jscomp$36$$, $border$jscomp$6$$, $format$jscomp$24$$, $type$jscomp$189$$, $pixelData$jscomp$1_pixels$jscomp$3$$) {
  $pixelData$jscomp$1_pixels$jscomp$3$$ = ($pixelData$jscomp$1_pixels$jscomp$3$$ >>>= 0) ? $emscriptenWebGLGetTexPixelData$$($type$jscomp$189$$, $format$jscomp$24$$, $width$jscomp$39$$, $height$jscomp$36$$, $pixelData$jscomp$1_pixels$jscomp$3$$) : null;
  $GLctx$$.texImage2D($target$jscomp$123$$, $level$jscomp$22$$, $internalFormat$jscomp$2$$, $width$jscomp$39$$, $height$jscomp$36$$, $border$jscomp$6$$, $format$jscomp$24$$, $type$jscomp$189$$, $pixelData$jscomp$1_pixels$jscomp$3$$);
}, emscripten_glTexParameterf:($x0$jscomp$34$$, $x1$jscomp$22$$, $x2$jscomp$14$$) => $GLctx$$.texParameterf($x0$jscomp$34$$, $x1$jscomp$22$$, $x2$jscomp$14$$), emscripten_glTexParameterfv:function($target$jscomp$124$$, $pname$jscomp$40$$, $params$jscomp$14$$) {
  $GLctx$$.texParameterf($target$jscomp$124$$, $pname$jscomp$40$$, $HEAPF32$$[$params$jscomp$14$$ >>> 0 >>> 2 >>> 0]);
}, emscripten_glTexParameteri:($x0$jscomp$35$$, $x1$jscomp$23$$, $x2$jscomp$15$$) => $GLctx$$.texParameteri($x0$jscomp$35$$, $x1$jscomp$23$$, $x2$jscomp$15$$), emscripten_glTexParameteriv:function($target$jscomp$125$$, $pname$jscomp$41$$, $params$jscomp$15$$) {
  $GLctx$$.texParameteri($target$jscomp$125$$, $pname$jscomp$41$$, $HEAP32$$[$params$jscomp$15$$ >>> 0 >>> 2 >>> 0]);
}, emscripten_glTexSubImage2D:function($target$jscomp$126$$, $level$jscomp$23$$, $xoffset$jscomp$9$$, $yoffset$jscomp$9$$, $width$jscomp$40$$, $height$jscomp$37$$, $format$jscomp$25$$, $type$jscomp$190$$, $pixelData$jscomp$2_pixels$jscomp$4$$) {
  $pixelData$jscomp$2_pixels$jscomp$4$$ = ($pixelData$jscomp$2_pixels$jscomp$4$$ >>>= 0) ? $emscriptenWebGLGetTexPixelData$$($type$jscomp$190$$, $format$jscomp$25$$, $width$jscomp$40$$, $height$jscomp$37$$, $pixelData$jscomp$2_pixels$jscomp$4$$) : null;
  $GLctx$$.texSubImage2D($target$jscomp$126$$, $level$jscomp$23$$, $xoffset$jscomp$9$$, $yoffset$jscomp$9$$, $width$jscomp$40$$, $height$jscomp$37$$, $format$jscomp$25$$, $type$jscomp$190$$, $pixelData$jscomp$2_pixels$jscomp$4$$);
}, emscripten_glUniform1f:($location$jscomp$83$$, $v0$jscomp$16$$) => {
  $GLctx$$.uniform1f($webglGetUniformLocation$$($location$jscomp$83$$), $v0$jscomp$16$$);
}, emscripten_glUniform1fv:function($location$jscomp$84$$, $count$jscomp$50$$, $value$jscomp$115$$) {
  $value$jscomp$115$$ >>>= 0;
  if (288 >= $count$jscomp$50$$) {
    for (var $view$jscomp$8$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$50$$], $i$jscomp$45$$ = 0; $i$jscomp$45$$ < $count$jscomp$50$$; ++$i$jscomp$45$$) {
      $view$jscomp$8$$[$i$jscomp$45$$] = $HEAPF32$$[$value$jscomp$115$$ + 4 * $i$jscomp$45$$ >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$8$$ = $HEAPF32$$.subarray($value$jscomp$115$$ >>> 2 >>> 0, $value$jscomp$115$$ + 4 * $count$jscomp$50$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform1fv($webglGetUniformLocation$$($location$jscomp$84$$), $view$jscomp$8$$);
}, emscripten_glUniform1i:($location$jscomp$85$$, $v0$jscomp$17$$) => {
  $GLctx$$.uniform1i($webglGetUniformLocation$$($location$jscomp$85$$), $v0$jscomp$17$$);
}, emscripten_glUniform1iv:function($location$jscomp$86$$, $count$jscomp$51$$, $value$jscomp$116$$) {
  $value$jscomp$116$$ >>>= 0;
  if (288 >= $count$jscomp$51$$) {
    for (var $view$jscomp$9$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$51$$], $i$jscomp$46$$ = 0; $i$jscomp$46$$ < $count$jscomp$51$$; ++$i$jscomp$46$$) {
      $view$jscomp$9$$[$i$jscomp$46$$] = $HEAP32$$[$value$jscomp$116$$ + 4 * $i$jscomp$46$$ >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$9$$ = $HEAP32$$.subarray($value$jscomp$116$$ >>> 2 >>> 0, $value$jscomp$116$$ + 4 * $count$jscomp$51$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform1iv($webglGetUniformLocation$$($location$jscomp$86$$), $view$jscomp$9$$);
}, emscripten_glUniform2f:($location$jscomp$87$$, $v0$jscomp$18$$, $v1$jscomp$12$$) => {
  $GLctx$$.uniform2f($webglGetUniformLocation$$($location$jscomp$87$$), $v0$jscomp$18$$, $v1$jscomp$12$$);
}, emscripten_glUniform2fv:function($location$jscomp$88$$, $count$jscomp$52$$, $value$jscomp$117$$) {
  $value$jscomp$117$$ >>>= 0;
  if (144 >= $count$jscomp$52$$) {
    $count$jscomp$52$$ *= 2;
    for (var $view$jscomp$10$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$52$$], $i$jscomp$47$$ = 0; $i$jscomp$47$$ < $count$jscomp$52$$; $i$jscomp$47$$ += 2) {
      $view$jscomp$10$$[$i$jscomp$47$$] = $HEAPF32$$[$value$jscomp$117$$ + 4 * $i$jscomp$47$$ >>> 2 >>> 0], $view$jscomp$10$$[$i$jscomp$47$$ + 1] = $HEAPF32$$[$value$jscomp$117$$ + (4 * $i$jscomp$47$$ + 4) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$10$$ = $HEAPF32$$.subarray($value$jscomp$117$$ >>> 2 >>> 0, $value$jscomp$117$$ + 8 * $count$jscomp$52$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform2fv($webglGetUniformLocation$$($location$jscomp$88$$), $view$jscomp$10$$);
}, emscripten_glUniform2i:($location$jscomp$89$$, $v0$jscomp$19$$, $v1$jscomp$13$$) => {
  $GLctx$$.uniform2i($webglGetUniformLocation$$($location$jscomp$89$$), $v0$jscomp$19$$, $v1$jscomp$13$$);
}, emscripten_glUniform2iv:function($location$jscomp$90$$, $count$jscomp$53$$, $value$jscomp$118$$) {
  $value$jscomp$118$$ >>>= 0;
  if (144 >= $count$jscomp$53$$) {
    $count$jscomp$53$$ *= 2;
    for (var $view$jscomp$11$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$53$$], $i$jscomp$48$$ = 0; $i$jscomp$48$$ < $count$jscomp$53$$; $i$jscomp$48$$ += 2) {
      $view$jscomp$11$$[$i$jscomp$48$$] = $HEAP32$$[$value$jscomp$118$$ + 4 * $i$jscomp$48$$ >>> 2 >>> 0], $view$jscomp$11$$[$i$jscomp$48$$ + 1] = $HEAP32$$[$value$jscomp$118$$ + (4 * $i$jscomp$48$$ + 4) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$11$$ = $HEAP32$$.subarray($value$jscomp$118$$ >>> 2 >>> 0, $value$jscomp$118$$ + 8 * $count$jscomp$53$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform2iv($webglGetUniformLocation$$($location$jscomp$90$$), $view$jscomp$11$$);
}, emscripten_glUniform3f:($location$jscomp$91$$, $v0$jscomp$20$$, $v1$jscomp$14$$, $v2$jscomp$8$$) => {
  $GLctx$$.uniform3f($webglGetUniformLocation$$($location$jscomp$91$$), $v0$jscomp$20$$, $v1$jscomp$14$$, $v2$jscomp$8$$);
}, emscripten_glUniform3fv:function($location$jscomp$92$$, $count$jscomp$54$$, $value$jscomp$119$$) {
  $value$jscomp$119$$ >>>= 0;
  if (96 >= $count$jscomp$54$$) {
    $count$jscomp$54$$ *= 3;
    for (var $view$jscomp$12$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$54$$], $i$jscomp$49$$ = 0; $i$jscomp$49$$ < $count$jscomp$54$$; $i$jscomp$49$$ += 3) {
      $view$jscomp$12$$[$i$jscomp$49$$] = $HEAPF32$$[$value$jscomp$119$$ + 4 * $i$jscomp$49$$ >>> 2 >>> 0], $view$jscomp$12$$[$i$jscomp$49$$ + 1] = $HEAPF32$$[$value$jscomp$119$$ + (4 * $i$jscomp$49$$ + 4) >>> 2 >>> 0], $view$jscomp$12$$[$i$jscomp$49$$ + 2] = $HEAPF32$$[$value$jscomp$119$$ + (4 * $i$jscomp$49$$ + 8) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$12$$ = $HEAPF32$$.subarray($value$jscomp$119$$ >>> 2 >>> 0, $value$jscomp$119$$ + 12 * $count$jscomp$54$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform3fv($webglGetUniformLocation$$($location$jscomp$92$$), $view$jscomp$12$$);
}, emscripten_glUniform3i:($location$jscomp$93$$, $v0$jscomp$21$$, $v1$jscomp$15$$, $v2$jscomp$9$$) => {
  $GLctx$$.uniform3i($webglGetUniformLocation$$($location$jscomp$93$$), $v0$jscomp$21$$, $v1$jscomp$15$$, $v2$jscomp$9$$);
}, emscripten_glUniform3iv:function($location$jscomp$94$$, $count$jscomp$55$$, $value$jscomp$120$$) {
  $value$jscomp$120$$ >>>= 0;
  if (96 >= $count$jscomp$55$$) {
    $count$jscomp$55$$ *= 3;
    for (var $view$jscomp$13$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$55$$], $i$jscomp$50$$ = 0; $i$jscomp$50$$ < $count$jscomp$55$$; $i$jscomp$50$$ += 3) {
      $view$jscomp$13$$[$i$jscomp$50$$] = $HEAP32$$[$value$jscomp$120$$ + 4 * $i$jscomp$50$$ >>> 2 >>> 0], $view$jscomp$13$$[$i$jscomp$50$$ + 1] = $HEAP32$$[$value$jscomp$120$$ + (4 * $i$jscomp$50$$ + 4) >>> 2 >>> 0], $view$jscomp$13$$[$i$jscomp$50$$ + 2] = $HEAP32$$[$value$jscomp$120$$ + (4 * $i$jscomp$50$$ + 8) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$13$$ = $HEAP32$$.subarray($value$jscomp$120$$ >>> 2 >>> 0, $value$jscomp$120$$ + 12 * $count$jscomp$55$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform3iv($webglGetUniformLocation$$($location$jscomp$94$$), $view$jscomp$13$$);
}, emscripten_glUniform4f:($location$jscomp$95$$, $v0$jscomp$22$$, $v1$jscomp$16$$, $v2$jscomp$10$$, $v3$jscomp$4$$) => {
  $GLctx$$.uniform4f($webglGetUniformLocation$$($location$jscomp$95$$), $v0$jscomp$22$$, $v1$jscomp$16$$, $v2$jscomp$10$$, $v3$jscomp$4$$);
}, emscripten_glUniform4fv:function($location$jscomp$96$$, $count$jscomp$56$$, $value$jscomp$121$$) {
  $value$jscomp$121$$ >>>= 0;
  if (72 >= $count$jscomp$56$$) {
    var $view$jscomp$14$$ = $miniTempWebGLFloatBuffers$$[4 * $count$jscomp$56$$], $heap$jscomp$3$$ = $HEAPF32$$;
    $value$jscomp$121$$ >>>= 2;
    $count$jscomp$56$$ *= 4;
    for (var $i$jscomp$51$$ = 0; $i$jscomp$51$$ < $count$jscomp$56$$; $i$jscomp$51$$ += 4) {
      var $dst$jscomp$1$$ = $value$jscomp$121$$ + $i$jscomp$51$$;
      $view$jscomp$14$$[$i$jscomp$51$$] = $heap$jscomp$3$$[$dst$jscomp$1$$ >>> 0];
      $view$jscomp$14$$[$i$jscomp$51$$ + 1] = $heap$jscomp$3$$[$dst$jscomp$1$$ + 1 >>> 0];
      $view$jscomp$14$$[$i$jscomp$51$$ + 2] = $heap$jscomp$3$$[$dst$jscomp$1$$ + 2 >>> 0];
      $view$jscomp$14$$[$i$jscomp$51$$ + 3] = $heap$jscomp$3$$[$dst$jscomp$1$$ + 3 >>> 0];
    }
  } else {
    $view$jscomp$14$$ = $HEAPF32$$.subarray($value$jscomp$121$$ >>> 2 >>> 0, $value$jscomp$121$$ + 16 * $count$jscomp$56$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform4fv($webglGetUniformLocation$$($location$jscomp$96$$), $view$jscomp$14$$);
}, emscripten_glUniform4i:($location$jscomp$97$$, $v0$jscomp$23$$, $v1$jscomp$17$$, $v2$jscomp$11$$, $v3$jscomp$5$$) => {
  $GLctx$$.uniform4i($webglGetUniformLocation$$($location$jscomp$97$$), $v0$jscomp$23$$, $v1$jscomp$17$$, $v2$jscomp$11$$, $v3$jscomp$5$$);
}, emscripten_glUniform4iv:function($location$jscomp$98$$, $count$jscomp$57$$, $value$jscomp$122$$) {
  $value$jscomp$122$$ >>>= 0;
  if (72 >= $count$jscomp$57$$) {
    $count$jscomp$57$$ *= 4;
    for (var $view$jscomp$15$$ = $miniTempWebGLIntBuffers$$[$count$jscomp$57$$], $i$jscomp$52$$ = 0; $i$jscomp$52$$ < $count$jscomp$57$$; $i$jscomp$52$$ += 4) {
      $view$jscomp$15$$[$i$jscomp$52$$] = $HEAP32$$[$value$jscomp$122$$ + 4 * $i$jscomp$52$$ >>> 2 >>> 0], $view$jscomp$15$$[$i$jscomp$52$$ + 1] = $HEAP32$$[$value$jscomp$122$$ + (4 * $i$jscomp$52$$ + 4) >>> 2 >>> 0], $view$jscomp$15$$[$i$jscomp$52$$ + 2] = $HEAP32$$[$value$jscomp$122$$ + (4 * $i$jscomp$52$$ + 8) >>> 2 >>> 0], $view$jscomp$15$$[$i$jscomp$52$$ + 3] = $HEAP32$$[$value$jscomp$122$$ + (4 * $i$jscomp$52$$ + 12) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$15$$ = $HEAP32$$.subarray($value$jscomp$122$$ >>> 2 >>> 0, $value$jscomp$122$$ + 16 * $count$jscomp$57$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniform4iv($webglGetUniformLocation$$($location$jscomp$98$$), $view$jscomp$15$$);
}, emscripten_glUniformMatrix2fv:function($location$jscomp$99$$, $count$jscomp$58$$, $transpose$jscomp$21$$, $value$jscomp$123$$) {
  $value$jscomp$123$$ >>>= 0;
  if (72 >= $count$jscomp$58$$) {
    $count$jscomp$58$$ *= 4;
    for (var $view$jscomp$16$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$58$$], $i$jscomp$53$$ = 0; $i$jscomp$53$$ < $count$jscomp$58$$; $i$jscomp$53$$ += 4) {
      $view$jscomp$16$$[$i$jscomp$53$$] = $HEAPF32$$[$value$jscomp$123$$ + 4 * $i$jscomp$53$$ >>> 2 >>> 0], $view$jscomp$16$$[$i$jscomp$53$$ + 1] = $HEAPF32$$[$value$jscomp$123$$ + (4 * $i$jscomp$53$$ + 4) >>> 2 >>> 0], $view$jscomp$16$$[$i$jscomp$53$$ + 2] = $HEAPF32$$[$value$jscomp$123$$ + (4 * $i$jscomp$53$$ + 8) >>> 2 >>> 0], $view$jscomp$16$$[$i$jscomp$53$$ + 3] = $HEAPF32$$[$value$jscomp$123$$ + (4 * $i$jscomp$53$$ + 12) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$16$$ = $HEAPF32$$.subarray($value$jscomp$123$$ >>> 2 >>> 0, $value$jscomp$123$$ + 16 * $count$jscomp$58$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniformMatrix2fv($webglGetUniformLocation$$($location$jscomp$99$$), !!$transpose$jscomp$21$$, $view$jscomp$16$$);
}, emscripten_glUniformMatrix3fv:function($location$jscomp$100$$, $count$jscomp$59$$, $transpose$jscomp$22$$, $value$jscomp$124$$) {
  $value$jscomp$124$$ >>>= 0;
  if (32 >= $count$jscomp$59$$) {
    $count$jscomp$59$$ *= 9;
    for (var $view$jscomp$17$$ = $miniTempWebGLFloatBuffers$$[$count$jscomp$59$$], $i$jscomp$54$$ = 0; $i$jscomp$54$$ < $count$jscomp$59$$; $i$jscomp$54$$ += 9) {
      $view$jscomp$17$$[$i$jscomp$54$$] = $HEAPF32$$[$value$jscomp$124$$ + 4 * $i$jscomp$54$$ >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 1] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 4) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 2] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 8) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 3] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 12) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 4] = $HEAPF32$$[$value$jscomp$124$$ + 
      (4 * $i$jscomp$54$$ + 16) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 5] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 20) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 6] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 24) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 7] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 28) >>> 2 >>> 0], $view$jscomp$17$$[$i$jscomp$54$$ + 8] = $HEAPF32$$[$value$jscomp$124$$ + (4 * $i$jscomp$54$$ + 32) >>> 2 >>> 0];
    }
  } else {
    $view$jscomp$17$$ = $HEAPF32$$.subarray($value$jscomp$124$$ >>> 2 >>> 0, $value$jscomp$124$$ + 36 * $count$jscomp$59$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniformMatrix3fv($webglGetUniformLocation$$($location$jscomp$100$$), !!$transpose$jscomp$22$$, $view$jscomp$17$$);
}, emscripten_glUniformMatrix4fv:function($location$jscomp$101$$, $count$jscomp$60$$, $transpose$jscomp$23$$, $value$jscomp$125$$) {
  $value$jscomp$125$$ >>>= 0;
  if (18 >= $count$jscomp$60$$) {
    var $view$jscomp$18$$ = $miniTempWebGLFloatBuffers$$[16 * $count$jscomp$60$$], $heap$jscomp$4$$ = $HEAPF32$$;
    $value$jscomp$125$$ >>>= 2;
    $count$jscomp$60$$ *= 16;
    for (var $i$jscomp$55$$ = 0; $i$jscomp$55$$ < $count$jscomp$60$$; $i$jscomp$55$$ += 16) {
      var $dst$jscomp$2$$ = $value$jscomp$125$$ + $i$jscomp$55$$;
      $view$jscomp$18$$[$i$jscomp$55$$] = $heap$jscomp$4$$[$dst$jscomp$2$$ >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 1] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 1 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 2] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 2 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 3] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 3 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 4] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 4 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 5] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 5 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 6] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 6 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 7] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 7 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 8] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 8 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 9] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 9 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 10] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 10 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 11] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 11 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 12] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 12 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 13] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 13 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 14] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 14 >>> 0];
      $view$jscomp$18$$[$i$jscomp$55$$ + 15] = $heap$jscomp$4$$[$dst$jscomp$2$$ + 15 >>> 0];
    }
  } else {
    $view$jscomp$18$$ = $HEAPF32$$.subarray($value$jscomp$125$$ >>> 2 >>> 0, $value$jscomp$125$$ + 64 * $count$jscomp$60$$ >>> 2 >>> 0);
  }
  $GLctx$$.uniformMatrix4fv($webglGetUniformLocation$$($location$jscomp$101$$), !!$transpose$jscomp$23$$, $view$jscomp$18$$);
}, emscripten_glUseProgram:$program$jscomp$82$$ => {
  $program$jscomp$82$$ = $GL$programs$$[$program$jscomp$82$$];
  $GLctx$$.useProgram($program$jscomp$82$$);
  $GLctx$$.$currentProgram$ = $program$jscomp$82$$;
}, emscripten_glValidateProgram:$program$jscomp$83$$ => {
  $GLctx$$.validateProgram($GL$programs$$[$program$jscomp$83$$]);
}, emscripten_glVertexAttrib1f:($x0$jscomp$36$$, $x1$jscomp$24$$) => $GLctx$$.vertexAttrib1f($x0$jscomp$36$$, $x1$jscomp$24$$), emscripten_glVertexAttrib1fv:function($index$jscomp$114$$, $v$jscomp$3$$) {
  $GLctx$$.vertexAttrib1f($index$jscomp$114$$, $HEAPF32$$[$v$jscomp$3$$ >>> 0 >>> 2]);
}, emscripten_glVertexAttrib2f:($x0$jscomp$37$$, $x1$jscomp$25$$, $x2$jscomp$16$$) => $GLctx$$.vertexAttrib2f($x0$jscomp$37$$, $x1$jscomp$25$$, $x2$jscomp$16$$), emscripten_glVertexAttrib2fv:function($index$jscomp$115$$, $v$jscomp$4$$) {
  $v$jscomp$4$$ >>>= 0;
  $GLctx$$.vertexAttrib2f($index$jscomp$115$$, $HEAPF32$$[$v$jscomp$4$$ >>> 2], $HEAPF32$$[$v$jscomp$4$$ + 4 >>> 2]);
}, emscripten_glVertexAttrib3f:($x0$jscomp$38$$, $x1$jscomp$26$$, $x2$jscomp$17$$, $x3$jscomp$9$$) => $GLctx$$.vertexAttrib3f($x0$jscomp$38$$, $x1$jscomp$26$$, $x2$jscomp$17$$, $x3$jscomp$9$$), emscripten_glVertexAttrib3fv:function($index$jscomp$116$$, $v$jscomp$5$$) {
  $v$jscomp$5$$ >>>= 0;
  $GLctx$$.vertexAttrib3f($index$jscomp$116$$, $HEAPF32$$[$v$jscomp$5$$ >>> 2], $HEAPF32$$[$v$jscomp$5$$ + 4 >>> 2], $HEAPF32$$[$v$jscomp$5$$ + 8 >>> 2]);
}, emscripten_glVertexAttrib4f:($x0$jscomp$39$$, $x1$jscomp$27$$, $x2$jscomp$18$$, $x3$jscomp$10$$, $x4$jscomp$2$$) => $GLctx$$.vertexAttrib4f($x0$jscomp$39$$, $x1$jscomp$27$$, $x2$jscomp$18$$, $x3$jscomp$10$$, $x4$jscomp$2$$), emscripten_glVertexAttrib4fv:function($index$jscomp$117$$, $v$jscomp$6$$) {
  $v$jscomp$6$$ >>>= 0;
  $GLctx$$.vertexAttrib4f($index$jscomp$117$$, $HEAPF32$$[$v$jscomp$6$$ >>> 2], $HEAPF32$$[$v$jscomp$6$$ + 4 >>> 2], $HEAPF32$$[$v$jscomp$6$$ + 8 >>> 2], $HEAPF32$$[$v$jscomp$6$$ + 12 >>> 2]);
}, emscripten_glVertexAttribDivisorANGLE:($index$jscomp$118$$, $divisor$jscomp$4$$) => {
  $GLctx$$.vertexAttribDivisor($index$jscomp$118$$, $divisor$jscomp$4$$);
}, emscripten_glVertexAttribPointer:function($index$jscomp$119$$, $size$jscomp$36$$, $type$jscomp$191$$, $normalized$jscomp$2$$, $stride$jscomp$3$$, $ptr$jscomp$14$$) {
  $GLctx$$.vertexAttribPointer($index$jscomp$119$$, $size$jscomp$36$$, $type$jscomp$191$$, !!$normalized$jscomp$2$$, $stride$jscomp$3$$, $ptr$jscomp$14$$ >>> 0);
}, emscripten_glViewport:($x0$jscomp$40$$, $x1$jscomp$28$$, $x2$jscomp$19$$, $x3$jscomp$11$$) => $GLctx$$.viewport($x0$jscomp$40$$, $x1$jscomp$28$$, $x2$jscomp$19$$, $x3$jscomp$11$$), emscripten_has_asyncify:() => 1, emscripten_request_fullscreen_strategy:function($target$jscomp$128$$, $deferUntilInEventHandler$$, $fullscreenStrategy$$) {
  $fullscreenStrategy$$ >>>= 0;
  return $doRequestFullscreen$$($target$jscomp$128$$ >>> 0, {$scaleMode$:$HEAP32$$[$fullscreenStrategy$$ >>> 2 >>> 0], $canvasResolutionScaleMode$:$HEAP32$$[$fullscreenStrategy$$ + 4 >>> 2 >>> 0], $filteringMode$:$HEAP32$$[$fullscreenStrategy$$ + 8 >>> 2 >>> 0], $deferUntilInEventHandler$:$deferUntilInEventHandler$$, $canvasResizedCallback$:$HEAP32$$[$fullscreenStrategy$$ + 12 >>> 2 >>> 0], $canvasResizedCallbackUserData$:$HEAP32$$[$fullscreenStrategy$$ + 16 >>> 2 >>> 0]});
}, emscripten_request_pointerlock:function($target$jscomp$129$$, $deferUntilInEventHandler$jscomp$1$$) {
  $target$jscomp$129$$ = $findEventTarget$$($target$jscomp$129$$ >>> 0);
  return $target$jscomp$129$$ ? $target$jscomp$129$$.requestPointerLock ? $JSCompiler_StaticMethods_canPerformEventHandlerRequests$$() ? $requestPointerLock$$($target$jscomp$129$$) : $deferUntilInEventHandler$jscomp$1$$ ? ($JSCompiler_StaticMethods_deferCall$$($requestPointerLock$$, 2, [$target$jscomp$129$$]), 1) : -2 : -1 : -4;
}, emscripten_resize_heap:function($requestedSize$$) {
  $requestedSize$$ >>>= 0;
  var $oldSize$$ = $HEAPU8$$.length;
  $assert$$($requestedSize$$ > $oldSize$$);
  if (4294901760 < $requestedSize$$) {
    return $err$$(`Cannot enlarge memory, requested ${$requestedSize$$} bytes, but the limit is ${4294901760} bytes!`), !1;
  }
  for (var $cutDown$$ = 1; 4 >= $cutDown$$; $cutDown$$ *= 2) {
    var $oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$ = $oldSize$$ * (1 + .2 / $cutDown$$);
    $oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$ = Math.min($oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$, $requestedSize$$ + 100663296);
    var $JSCompiler_temp_const$jscomp$31_newSize$jscomp$2$$ = Math, $JSCompiler_temp_const$jscomp$30_size$jscomp$inline_291$$ = $JSCompiler_temp_const$jscomp$31_newSize$jscomp$2$$.min;
    $oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$ = Math.max($requestedSize$$, $oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$);
    $assert$$(65536, "alignment argument is required");
    $JSCompiler_temp_const$jscomp$31_newSize$jscomp$2$$ = $JSCompiler_temp_const$jscomp$30_size$jscomp$inline_291$$.call($JSCompiler_temp_const$jscomp$31_newSize$jscomp$2$$, 4294901760, 65536 * Math.ceil($oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$ / 65536));
    a: {
      $JSCompiler_temp_const$jscomp$30_size$jscomp$inline_291$$ = $JSCompiler_temp_const$jscomp$31_newSize$jscomp$2$$;
      $oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$ = $wasmMemory$$.buffer.byteLength;
      try {
        $wasmMemory$$.grow(($JSCompiler_temp_const$jscomp$30_size$jscomp$inline_291$$ - $oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$ + 65535) / 65536 | 0);
        $updateMemoryViews$$();
        var $JSCompiler_inline_result$jscomp$33$$ = 1;
        break a;
      } catch ($e$jscomp$inline_294$$) {
        $err$$(`growMemory: Attempted to grow heap from ${$oldHeapSize$jscomp$inline_292_overGrownHeapSize_size$jscomp$inline_288$$} bytes to ${$JSCompiler_temp_const$jscomp$30_size$jscomp$inline_291$$} bytes, but got error: ${$e$jscomp$inline_294$$}`);
      }
      $JSCompiler_inline_result$jscomp$33$$ = void 0;
    }
    if ($JSCompiler_inline_result$jscomp$33$$) {
      return !0;
    }
  }
  $err$$(`Failed to grow the heap from ${$oldSize$$} bytes to ${$JSCompiler_temp_const$jscomp$31_newSize$jscomp$2$$} bytes, not enough memory!`);
  return !1;
}, emscripten_sample_gamepad_data:$_emscripten_sample_gamepad_data$$, emscripten_set_beforeunload_callback_on_thread:function($userData$jscomp$1$$, $callbackfunc$jscomp$1$$, $targetThread$$) {
  return "undefined" == typeof onbeforeunload ? -1 : 1 !== $targetThread$$ >>> 0 ? -5 : $registerBeforeUnloadEventCallback$$($userData$jscomp$1$$ >>> 0, $callbackfunc$jscomp$1$$ >>> 0);
}, emscripten_set_blur_callback_on_thread:function($target$jscomp$132$$, $userData$jscomp$3$$, $useCapture$jscomp$2$$, $callbackfunc$jscomp$3$$) {
  return $registerFocusEventCallback$$($target$jscomp$132$$ >>> 0, $userData$jscomp$3$$ >>> 0, $useCapture$jscomp$2$$, $callbackfunc$jscomp$3$$ >>> 0, 12, "blur");
}, emscripten_set_canvas_element_size:$_emscripten_set_canvas_element_size$$, emscripten_set_element_css_size:function($target$jscomp$133$$, $width$jscomp$41$$, $height$jscomp$38$$) {
  $target$jscomp$133$$ = $findEventTarget$$($target$jscomp$133$$ >>> 0);
  if (!$target$jscomp$133$$) {
    return -4;
  }
  $target$jscomp$133$$.style.width = $width$jscomp$41$$ + "px";
  $target$jscomp$133$$.style.height = $height$jscomp$38$$ + "px";
  return 0;
}, emscripten_set_focus_callback_on_thread:function($target$jscomp$134$$, $userData$jscomp$4$$, $useCapture$jscomp$3$$, $callbackfunc$jscomp$4$$) {
  return $registerFocusEventCallback$$($target$jscomp$134$$ >>> 0, $userData$jscomp$4$$ >>> 0, $useCapture$jscomp$3$$, $callbackfunc$jscomp$4$$ >>> 0, 13, "focus");
}, emscripten_set_fullscreenchange_callback_on_thread:function($target$jscomp$136$$, $userData$jscomp$6$$, $useCapture$jscomp$5$$, $callbackfunc$jscomp$6$$) {
  $target$jscomp$136$$ >>>= 0;
  $userData$jscomp$6$$ >>>= 0;
  $callbackfunc$jscomp$6$$ >>>= 0;
  if (!$JSEvents$$.fullscreenEnabled()) {
    return -1;
  }
  $target$jscomp$136$$ = $findEventTarget$$($target$jscomp$136$$);
  if (!$target$jscomp$136$$) {
    return -4;
  }
  $registerFullscreenChangeEventCallback$$($target$jscomp$136$$, $userData$jscomp$6$$, $useCapture$jscomp$5$$, $callbackfunc$jscomp$6$$, "webkitfullscreenchange");
  return $registerFullscreenChangeEventCallback$$($target$jscomp$136$$, $userData$jscomp$6$$, $useCapture$jscomp$5$$, $callbackfunc$jscomp$6$$, "fullscreenchange");
}, emscripten_set_gamepadconnected_callback_on_thread:function($userData$jscomp$8$$, $useCapture$jscomp$7$$, $callbackfunc$jscomp$8$$) {
  $userData$jscomp$8$$ >>>= 0;
  $callbackfunc$jscomp$8$$ >>>= 0;
  return $_emscripten_sample_gamepad_data$$() ? -1 : $registerGamepadEventCallback$$($userData$jscomp$8$$, $useCapture$jscomp$7$$, $callbackfunc$jscomp$8$$, 26, "gamepadconnected");
}, emscripten_set_gamepaddisconnected_callback_on_thread:function($userData$jscomp$9$$, $useCapture$jscomp$8$$, $callbackfunc$jscomp$9$$) {
  $userData$jscomp$9$$ >>>= 0;
  $callbackfunc$jscomp$9$$ >>>= 0;
  return $_emscripten_sample_gamepad_data$$() ? -1 : $registerGamepadEventCallback$$($userData$jscomp$9$$, $useCapture$jscomp$8$$, $callbackfunc$jscomp$9$$, 27, "gamepaddisconnected");
}, emscripten_set_keydown_callback_on_thread:function($target$jscomp$139$$, $userData$jscomp$11$$, $useCapture$jscomp$10$$, $callbackfunc$jscomp$11$$) {
  return $registerKeyEventCallback$$($target$jscomp$139$$ >>> 0, $userData$jscomp$11$$ >>> 0, $useCapture$jscomp$10$$, $callbackfunc$jscomp$11$$ >>> 0, 2, "keydown");
}, emscripten_set_keypress_callback_on_thread:function($target$jscomp$140$$, $userData$jscomp$12$$, $useCapture$jscomp$11$$, $callbackfunc$jscomp$12$$) {
  return $registerKeyEventCallback$$($target$jscomp$140$$ >>> 0, $userData$jscomp$12$$ >>> 0, $useCapture$jscomp$11$$, $callbackfunc$jscomp$12$$ >>> 0, 1, "keypress");
}, emscripten_set_keyup_callback_on_thread:function($target$jscomp$141$$, $userData$jscomp$13$$, $useCapture$jscomp$12$$, $callbackfunc$jscomp$13$$) {
  return $registerKeyEventCallback$$($target$jscomp$141$$ >>> 0, $userData$jscomp$13$$ >>> 0, $useCapture$jscomp$12$$, $callbackfunc$jscomp$13$$ >>> 0, 3, "keyup");
}, emscripten_set_main_loop_arg:function($func$jscomp$18$$, $arg$jscomp$13$$, $fps$jscomp$1$$, $simulateInfiniteLoop$jscomp$1$$) {
  $func$jscomp$18$$ >>>= 0;
  $arg$jscomp$13$$ >>>= 0;
  $setMainLoop$$(() => dynCall_vi($func$jscomp$18$$, $arg$jscomp$13$$), $fps$jscomp$1$$, $simulateInfiniteLoop$jscomp$1$$, $arg$jscomp$13$$);
}, emscripten_set_main_loop_timing:$_emscripten_set_main_loop_timing$$, emscripten_set_mousedown_callback_on_thread:function($target$jscomp$144$$, $userData$jscomp$15$$, $useCapture$jscomp$14$$, $callbackfunc$jscomp$15$$) {
  return $registerMouseEventCallback$$($target$jscomp$144$$ >>> 0, $userData$jscomp$15$$ >>> 0, $useCapture$jscomp$14$$, $callbackfunc$jscomp$15$$ >>> 0, 5, "mousedown");
}, emscripten_set_mouseenter_callback_on_thread:function($target$jscomp$145$$, $userData$jscomp$16$$, $useCapture$jscomp$15$$, $callbackfunc$jscomp$16$$) {
  return $registerMouseEventCallback$$($target$jscomp$145$$ >>> 0, $userData$jscomp$16$$ >>> 0, $useCapture$jscomp$15$$, $callbackfunc$jscomp$16$$ >>> 0, 33, "mouseenter");
}, emscripten_set_mouseleave_callback_on_thread:function($target$jscomp$146$$, $userData$jscomp$17$$, $useCapture$jscomp$16$$, $callbackfunc$jscomp$17$$) {
  return $registerMouseEventCallback$$($target$jscomp$146$$ >>> 0, $userData$jscomp$17$$ >>> 0, $useCapture$jscomp$16$$, $callbackfunc$jscomp$17$$ >>> 0, 34, "mouseleave");
}, emscripten_set_mousemove_callback_on_thread:function($target$jscomp$147$$, $userData$jscomp$18$$, $useCapture$jscomp$17$$, $callbackfunc$jscomp$18$$) {
  return $registerMouseEventCallback$$($target$jscomp$147$$ >>> 0, $userData$jscomp$18$$ >>> 0, $useCapture$jscomp$17$$, $callbackfunc$jscomp$18$$ >>> 0, 8, "mousemove");
}, emscripten_set_mouseup_callback_on_thread:function($target$jscomp$148$$, $userData$jscomp$19$$, $useCapture$jscomp$18$$, $callbackfunc$jscomp$19$$) {
  return $registerMouseEventCallback$$($target$jscomp$148$$ >>> 0, $userData$jscomp$19$$ >>> 0, $useCapture$jscomp$18$$, $callbackfunc$jscomp$19$$ >>> 0, 6, "mouseup");
}, emscripten_set_orientationchange_callback_on_thread:function($userData$jscomp$21$$, $useCapture$jscomp$20$$, $callbackfunc$jscomp$21$$) {
  return window.screen && screen.orientation ? $registerOrientationChangeEventCallback$$($userData$jscomp$21$$ >>> 0, $useCapture$jscomp$20$$, $callbackfunc$jscomp$21$$ >>> 0) : -1;
}, emscripten_set_pointerlockchange_callback_on_thread:function($target$jscomp$151$$, $userData$jscomp$23$$, $useCapture$jscomp$22$$, $callbackfunc$jscomp$23$$) {
  $userData$jscomp$23$$ >>>= 0;
  $callbackfunc$jscomp$23$$ >>>= 0;
  return document.body?.requestPointerLock ? ($target$jscomp$151$$ = $findEventTarget$$($target$jscomp$151$$ >>> 0)) ? $registerPointerlockChangeEventCallback$$($target$jscomp$151$$, $userData$jscomp$23$$, $useCapture$jscomp$22$$, $callbackfunc$jscomp$23$$) : -4 : -1;
}, emscripten_set_resize_callback_on_thread:function($target$jscomp$153$$, $userData$jscomp$25$$, $useCapture$jscomp$24$$, $callbackfunc$jscomp$25$$) {
  return $registerUiEventCallback$$($target$jscomp$153$$ >>> 0, $userData$jscomp$25$$ >>> 0, $useCapture$jscomp$24$$, $callbackfunc$jscomp$25$$ >>> 0);
}, emscripten_set_touchcancel_callback_on_thread:function($target$jscomp$155$$, $userData$jscomp$27$$, $useCapture$jscomp$26$$, $callbackfunc$jscomp$27$$) {
  return $registerTouchEventCallback$$($target$jscomp$155$$ >>> 0, $userData$jscomp$27$$ >>> 0, $useCapture$jscomp$26$$, $callbackfunc$jscomp$27$$ >>> 0, 25, "touchcancel");
}, emscripten_set_touchend_callback_on_thread:function($target$jscomp$156$$, $userData$jscomp$28$$, $useCapture$jscomp$27$$, $callbackfunc$jscomp$28$$) {
  return $registerTouchEventCallback$$($target$jscomp$156$$ >>> 0, $userData$jscomp$28$$ >>> 0, $useCapture$jscomp$27$$, $callbackfunc$jscomp$28$$ >>> 0, 23, "touchend");
}, emscripten_set_touchmove_callback_on_thread:function($target$jscomp$157$$, $userData$jscomp$29$$, $useCapture$jscomp$28$$, $callbackfunc$jscomp$29$$) {
  return $registerTouchEventCallback$$($target$jscomp$157$$ >>> 0, $userData$jscomp$29$$ >>> 0, $useCapture$jscomp$28$$, $callbackfunc$jscomp$29$$ >>> 0, 24, "touchmove");
}, emscripten_set_touchstart_callback_on_thread:function($target$jscomp$158$$, $userData$jscomp$30$$, $useCapture$jscomp$29$$, $callbackfunc$jscomp$30$$) {
  return $registerTouchEventCallback$$($target$jscomp$158$$ >>> 0, $userData$jscomp$30$$ >>> 0, $useCapture$jscomp$29$$, $callbackfunc$jscomp$30$$ >>> 0, 22, "touchstart");
}, emscripten_set_visibilitychange_callback_on_thread:function($userData$jscomp$32$$, $useCapture$jscomp$31$$, $callbackfunc$jscomp$32$$) {
  return $specialHTMLTargets$$[1] ? $registerVisibilityChangeEventCallback$$($userData$jscomp$32$$ >>> 0, $useCapture$jscomp$31$$, $callbackfunc$jscomp$32$$ >>> 0) : -4;
}, emscripten_set_wheel_callback_on_thread:function($target$jscomp$161$$, $userData$jscomp$34$$, $useCapture$jscomp$33$$, $callbackfunc$jscomp$34$$) {
  $userData$jscomp$34$$ >>>= 0;
  $callbackfunc$jscomp$34$$ >>>= 0;
  return ($target$jscomp$161$$ = $findEventTarget$$($target$jscomp$161$$ >>> 0)) ? "undefined" != typeof $target$jscomp$161$$.onwheel ? $registerWheelEventCallback$$($target$jscomp$161$$, $userData$jscomp$34$$, $useCapture$jscomp$33$$, $callbackfunc$jscomp$34$$) : -1 : -4;
}, emscripten_set_window_title:function($title$jscomp$12$$) {
  return document.title = $UTF8ToString$$($title$jscomp$12$$ >>> 0);
}, emscripten_sleep:$_emscripten_sleep$$, emscripten_webgl_create_context:function($canvas$jscomp$13_target$jscomp$162$$, $attributes$jscomp$1_contextAttributes$jscomp$1$$) {
  $canvas$jscomp$13_target$jscomp$162$$ >>>= 0;
  $attributes$jscomp$1_contextAttributes$jscomp$1$$ >>>= 0;
  $assert$$($attributes$jscomp$1_contextAttributes$jscomp$1$$);
  var $attr32$$ = $attributes$jscomp$1_contextAttributes$jscomp$1$$ >>> 2;
  $attributes$jscomp$1_contextAttributes$jscomp$1$$ = {alpha:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ >>> 0], depth:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 1 >>> 0], stencil:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 2 >>> 0], antialias:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 3 >>> 0], premultipliedAlpha:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 4 >>> 0], preserveDrawingBuffer:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 
  5 >>> 0], powerPreference:$webglPowerPreferences$$[$HEAP32$$[$attr32$$ + 2 >>> 0]], failIfMajorPerformanceCaveat:!!$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 12 >>> 0], $majorVersion$:$HEAP32$$[$attr32$$ + 4 >>> 0], $minorVersion$:$HEAP32$$[$attr32$$ + 5 >>> 0], $enableExtensionsByDefault$:$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 24 >>> 0], $explicitSwapControl$:$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 25 >>> 0], $proxyContextToMainThread$:$HEAP32$$[$attr32$$ + 
  7 >>> 0], $renderViaOffscreenBackBuffer$:$HEAP8$$[$attributes$jscomp$1_contextAttributes$jscomp$1$$ + 32 >>> 0]};
  1 !== $attributes$jscomp$1_contextAttributes$jscomp$1$$.$majorVersion$ && 2 !== $attributes$jscomp$1_contextAttributes$jscomp$1$$.$majorVersion$ && $err$$(`Invalid WebGL version requested: ${$attributes$jscomp$1_contextAttributes$jscomp$1$$.$majorVersion$}`);
  1 !== $attributes$jscomp$1_contextAttributes$jscomp$1$$.$majorVersion$ && $err$$("WebGL 2 requested but only WebGL 1 is supported (set -sMAX_WEBGL_VERSION=2 to fix the problem)");
  $canvas$jscomp$13_target$jscomp$162$$ = $findEventTarget$$($canvas$jscomp$13_target$jscomp$162$$);
  return !$canvas$jscomp$13_target$jscomp$162$$ || $attributes$jscomp$1_contextAttributes$jscomp$1$$.$explicitSwapControl$ ? 0 : $GL$createContext$$($canvas$jscomp$13_target$jscomp$162$$, $attributes$jscomp$1_contextAttributes$jscomp$1$$);
}, emscripten_webgl_destroy_context:function($contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$) {
  $contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$ >>>= 0;
  $GL$currentContext$$ == $contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$ && ($GL$currentContext$$ = 0);
  $GL$currentContext$$ === $GL$contexts$$[$contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$] && ($GL$currentContext$$ = null);
  "object" == typeof $JSEvents$$ && $JSEvents$$.$removeAllHandlersOnTarget$($GL$contexts$$[$contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$].$GLctx$.canvas);
  $GL$contexts$$[$contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$]?.$GLctx$.canvas && ($GL$contexts$$[$contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$].$GLctx$.canvas.$GLctxObject$ = void 0);
  $GL$contexts$$[$contextHandle$jscomp$5_contextHandle$jscomp$inline_296$$] = null;
}, emscripten_webgl_make_context_current:function($contextHandle$jscomp$6$$) {
  return $GL$makeContextCurrent$$($contextHandle$jscomp$6$$ >>> 0) ? 0 : -5;
}, emwgpuAdapterRequestDevice:function($adapter_adapterPtr$$, $futureId$jscomp$1$$, $deviceLostFutureId$$, $devicePtr$jscomp$1$$, $queuePtr$jscomp$1$$, $descriptor$jscomp$3$$) {
  $futureId$jscomp$1$$ = $bigintToI53Checked$$($futureId$jscomp$1$$);
  $deviceLostFutureId$$ = $bigintToI53Checked$$($deviceLostFutureId$$);
  $devicePtr$jscomp$1$$ >>>= 0;
  $queuePtr$jscomp$1$$ >>>= 0;
  $descriptor$jscomp$3$$ >>>= 0;
  $adapter_adapterPtr$$ = $WebGPU$getJsObject$$($adapter_adapterPtr$$ >>> 0);
  var $desc$jscomp$5$$ = {};
  if ($descriptor$jscomp$3$$) {
    $assert$$($descriptor$jscomp$3$$);
    $assert$$(0 === $HEAPU32$$[$descriptor$jscomp$3$$ >>> 2 >>> 0]);
    var $defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$ = $HEAPU32$$[$descriptor$jscomp$3$$ + 12 >>> 2 >>> 0];
    if ($defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$) {
      var $requiredFeaturesPtr$$ = $HEAPU32$$[$descriptor$jscomp$3$$ + 16 >>> 2 >>> 0];
      $desc$jscomp$5$$.requiredFeatures = Array.from($HEAPU32$$.subarray($requiredFeaturesPtr$$ >>> 2 >>> 0, $requiredFeaturesPtr$$ + 4 * $defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$ >>> 2 >>> 0), $feature$jscomp$4$$ => $WebGPU$FeatureName$$[$feature$jscomp$4$$]);
    }
    var $limitsPtr$$ = $HEAPU32$$[$descriptor$jscomp$3$$ + 20 >>> 2 >>> 0];
    if ($limitsPtr$$) {
      $assert$$($limitsPtr$$);
      $assert$$(0 === $HEAPU32$$[$limitsPtr$$ >>> 2 >>> 0]);
      var $requiredLimits$$ = {};
      function $setLimitU32IfDefined$$($name$jscomp$121$$, $limitOffset$jscomp$2_value$jscomp$126$$, $ignoreIfZero$$ = !1) {
        $limitOffset$jscomp$2_value$jscomp$126$$ = $HEAPU32$$[$limitsPtr$$ + $limitOffset$jscomp$2_value$jscomp$126$$ >>> 2 >>> 0];
        4294967295 == $limitOffset$jscomp$2_value$jscomp$126$$ || $ignoreIfZero$$ && 0 == $limitOffset$jscomp$2_value$jscomp$126$$ || ($requiredLimits$$[$name$jscomp$121$$] = $limitOffset$jscomp$2_value$jscomp$126$$);
      }
      function $setLimitU64IfDefined$$($name$jscomp$122$$, $limitOffset$jscomp$3_ptr$jscomp$48$$) {
        $limitOffset$jscomp$3_ptr$jscomp$48$$ = $limitsPtr$$ + $limitOffset$jscomp$3_ptr$jscomp$48$$;
        var $limitPart2$$ = $HEAPU32$$[$limitOffset$jscomp$3_ptr$jscomp$48$$ + 4 >>> 2 >>> 0];
        if (4294967295 != $HEAPU32$$[$limitOffset$jscomp$3_ptr$jscomp$48$$ >>> 2 >>> 0] || 4294967295 != $limitPart2$$) {
          $requiredLimits$$[$name$jscomp$122$$] = $readI53FromI64$$($limitOffset$jscomp$3_ptr$jscomp$48$$);
        }
      }
      $setLimitU32IfDefined$$("maxTextureDimension1D", 4);
      $setLimitU32IfDefined$$("maxTextureDimension2D", 8);
      $setLimitU32IfDefined$$("maxTextureDimension3D", 12);
      $setLimitU32IfDefined$$("maxTextureArrayLayers", 16);
      $setLimitU32IfDefined$$("maxBindGroups", 20);
      $setLimitU32IfDefined$$("maxBindGroupsPlusVertexBuffers", 24);
      $setLimitU32IfDefined$$("maxDynamicUniformBuffersPerPipelineLayout", 32);
      $setLimitU32IfDefined$$("maxDynamicStorageBuffersPerPipelineLayout", 36);
      $setLimitU32IfDefined$$("maxSampledTexturesPerShaderStage", 40);
      $setLimitU32IfDefined$$("maxSamplersPerShaderStage", 44);
      $setLimitU32IfDefined$$("maxStorageBuffersPerShaderStage", 48);
      $setLimitU32IfDefined$$("maxStorageTexturesPerShaderStage", 52);
      $setLimitU32IfDefined$$("maxUniformBuffersPerShaderStage", 56);
      $setLimitU32IfDefined$$("minUniformBufferOffsetAlignment", 80);
      $setLimitU32IfDefined$$("minStorageBufferOffsetAlignment", 84);
      $setLimitU64IfDefined$$("maxUniformBufferBindingSize", 64);
      $setLimitU64IfDefined$$("maxStorageBufferBindingSize", 72);
      $setLimitU32IfDefined$$("maxVertexBuffers", 88);
      $setLimitU64IfDefined$$("maxBufferSize", 96);
      $setLimitU32IfDefined$$("maxVertexAttributes", 104);
      $setLimitU32IfDefined$$("maxVertexBufferArrayStride", 108);
      $setLimitU32IfDefined$$("maxInterStageShaderVariables", 112);
      $setLimitU32IfDefined$$("maxColorAttachments", 116);
      $setLimitU32IfDefined$$("maxColorAttachmentBytesPerSample", 120);
      $setLimitU32IfDefined$$("maxComputeWorkgroupStorageSize", 124);
      $setLimitU32IfDefined$$("maxComputeInvocationsPerWorkgroup", 128);
      $setLimitU32IfDefined$$("maxComputeWorkgroupSizeX", 132);
      $setLimitU32IfDefined$$("maxComputeWorkgroupSizeY", 136);
      $setLimitU32IfDefined$$("maxComputeWorkgroupSizeZ", 140);
      $setLimitU32IfDefined$$("maxComputeWorkgroupsPerDimension", 144);
      $setLimitU32IfDefined$$("maxImmediateSize", 148, !0);
      $desc$jscomp$5$$.requiredLimits = $requiredLimits$$;
    }
    if ($defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$ = $HEAPU32$$[$descriptor$jscomp$3$$ + 24 >>> 2 >>> 0]) {
      $defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$ + 4)}, $desc$jscomp$5$$.defaultQueue = $defaultQueueDesc_defaultQueuePtr_requiredFeatureCount$$;
    }
    $desc$jscomp$5$$.label = $WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$3$$ + 4);
  }
  $WebGPU$Internals$futureInsert$$($futureId$jscomp$1$$, $adapter_adapterPtr$$.requestDevice($desc$jscomp$5$$).then($device$jscomp$2$$ => {
    $callUserCallback$$(() => {
      $WebGPU$Internals$jsObjects$$[$queuePtr$jscomp$1$$ >>> 0] = $device$jscomp$2$$.queue;
      $WebGPU$Internals$jsObjects$$[$devicePtr$jscomp$1$$ >>> 0] = $device$jscomp$2$$;
      $assert$$($deviceLostFutureId$$);
      $WebGPU$Internals$futureInsert$$($deviceLostFutureId$$, $device$jscomp$2$$.lost.then($info$jscomp$4$$ => {
        $callUserCallback$$(() => {
          $device$jscomp$2$$.onuncapturederror = () => {
          };
          var $sp$jscomp$3$$ = $_emscripten_stack_get_current$$(), $messagePtr$jscomp$1$$ = $stringToUTF8OnStack$$($info$jscomp$4$$.message);
          $_emwgpuOnDeviceLostCompleted$$($deviceLostFutureId$$, $emwgpuStringToInt_DeviceLostReason$$[$info$jscomp$4$$.reason], $messagePtr$jscomp$1$$);
          $__emscripten_stack_restore$$($sp$jscomp$3$$);
        });
      }));
      $assert$$("undefined" != typeof GPUValidationError);
      $assert$$("undefined" != typeof GPUOutOfMemoryError);
      $assert$$("undefined" != typeof GPUInternalError);
      $device$jscomp$2$$.onuncapturederror = $ev$jscomp$2_messagePtr$jscomp$2$$ => {
        var $type$jscomp$193$$ = 5;
        $ev$jscomp$2_messagePtr$jscomp$2$$.error instanceof GPUValidationError ? $type$jscomp$193$$ = 2 : $ev$jscomp$2_messagePtr$jscomp$2$$.error instanceof GPUOutOfMemoryError ? $type$jscomp$193$$ = 3 : $ev$jscomp$2_messagePtr$jscomp$2$$.error instanceof GPUInternalError && ($type$jscomp$193$$ = 4);
        var $sp$jscomp$4$$ = $_emscripten_stack_get_current$$();
        $ev$jscomp$2_messagePtr$jscomp$2$$ = $stringToUTF8OnStack$$($ev$jscomp$2_messagePtr$jscomp$2$$.error.message);
        $_emwgpuOnUncapturedError$$($devicePtr$jscomp$1$$, $type$jscomp$193$$, $ev$jscomp$2_messagePtr$jscomp$2$$);
        $__emscripten_stack_restore$$($sp$jscomp$4$$);
      };
      $_emwgpuOnRequestDeviceCompleted$$($futureId$jscomp$1$$, 1, $devicePtr$jscomp$1$$, 0);
    });
  }, $ex$$ => {
    $callUserCallback$$(() => {
      var $sp$jscomp$5$$ = $_emscripten_stack_get_current$$(), $messagePtr$jscomp$3$$ = $stringToUTF8OnStack$$($ex$$.message);
      $_emwgpuOnRequestDeviceCompleted$$($futureId$jscomp$1$$, 3, $devicePtr$jscomp$1$$, $messagePtr$jscomp$3$$);
      $deviceLostFutureId$$ && $_emwgpuOnDeviceLostCompleted$$($deviceLostFutureId$$, 4, $messagePtr$jscomp$3$$);
      $__emscripten_stack_restore$$($sp$jscomp$5$$);
    });
  }));
}, emwgpuDelete:function($ptr$jscomp$49$$) {
  delete $WebGPU$Internals$jsObjects$$[$ptr$jscomp$49$$ >>> 0];
}, emwgpuDeviceCreateBuffer:function($device$jscomp$3_devicePtr$jscomp$2$$, $desc$jscomp$6_descriptor$jscomp$4$$, $bufferPtr$jscomp$1$$) {
  $device$jscomp$3_devicePtr$jscomp$2$$ >>>= 0;
  $desc$jscomp$6_descriptor$jscomp$4$$ >>>= 0;
  $bufferPtr$jscomp$1$$ >>>= 0;
  $assert$$($desc$jscomp$6_descriptor$jscomp$4$$);
  $assert$$(0 === $HEAPU32$$[$desc$jscomp$6_descriptor$jscomp$4$$ >>> 2 >>> 0]);
  var $mappedAtCreation$$ = !!$HEAPU32$$[$desc$jscomp$6_descriptor$jscomp$4$$ + 32 >>> 2 >>> 0];
  $desc$jscomp$6_descriptor$jscomp$4$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($desc$jscomp$6_descriptor$jscomp$4$$ + 4), usage:$HEAPU32$$[$desc$jscomp$6_descriptor$jscomp$4$$ + 16 >>> 2 >>> 0], size:$readI53FromI64$$($desc$jscomp$6_descriptor$jscomp$4$$ + 24), mappedAtCreation:$mappedAtCreation$$};
  $device$jscomp$3_devicePtr$jscomp$2$$ = $WebGPU$getJsObject$$($device$jscomp$3_devicePtr$jscomp$2$$);
  try {
    var $buffer$jscomp$46$$ = $device$jscomp$3_devicePtr$jscomp$2$$.createBuffer($desc$jscomp$6_descriptor$jscomp$4$$);
  } catch ($ex$jscomp$1$$) {
    return $assert$$($ex$jscomp$1$$ instanceof RangeError), $assert$$($mappedAtCreation$$), $err$$("createBuffer threw:", $ex$jscomp$1$$), !1;
  }
  $WebGPU$Internals$jsObjects$$[$bufferPtr$jscomp$1$$ >>> 0] = $buffer$jscomp$46$$;
  return !0;
}, emwgpuDeviceCreateShaderModule:function($device$jscomp$4_devicePtr$jscomp$3$$, $desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$, $ptr$jscomp$inline_313_shaderModulePtr$$) {
  $device$jscomp$4_devicePtr$jscomp$3$$ >>>= 0;
  $desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$ >>>= 0;
  $ptr$jscomp$inline_313_shaderModulePtr$$ >>>= 0;
  $assert$$($desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$);
  var $nextInChainPtr$$ = $HEAPU32$$[$desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$ >>> 2 >>> 0];
  $assert$$(0 !== $nextInChainPtr$$);
  var $sType$$ = $HEAP32$$[$nextInChainPtr$$ + 4 >>> 2 >>> 0];
  $desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$ + 4), code:""};
  switch($sType$$) {
    case 2:
      $desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$.code = $WebGPU$makeStringFromStringView$$($nextInChainPtr$$ + 8);
      break;
    default:
      $abort$$("unrecognized ShaderModule sType");
  }
  $device$jscomp$4_devicePtr$jscomp$3$$ = $WebGPU$getJsObject$$($device$jscomp$4_devicePtr$jscomp$3$$);
  $desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$ = $device$jscomp$4_devicePtr$jscomp$3$$.createShaderModule($desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$);
  $WebGPU$Internals$jsObjects$$[$ptr$jscomp$inline_313_shaderModulePtr$$ >>> 0] = $desc$jscomp$7_descriptor$jscomp$5_jsObject$jscomp$inline_314$$;
}, emwgpuDeviceDestroy:$device$jscomp$5_devicePtr$jscomp$4$$ => {
  $device$jscomp$5_devicePtr$jscomp$4$$ = $WebGPU$getJsObject$$($device$jscomp$5_devicePtr$jscomp$4$$);
  $device$jscomp$5_devicePtr$jscomp$4$$.onuncapturederror = null;
  $device$jscomp$5_devicePtr$jscomp$4$$.destroy();
}, emwgpuGetPreferredFormat:() => {
  var $format$jscomp$27$$ = navigator.gpu.getPreferredCanvasFormat();
  return $emwgpuStringToInt_PreferredFormat$$[$format$jscomp$27$$];
}, emwgpuInstanceRequestAdapter:function($instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$, $futureId$jscomp$2$$, $options$jscomp$107$$, $adapterPtr$jscomp$1$$) {
  $futureId$jscomp$2$$ = $bigintToI53Checked$$($futureId$jscomp$2$$);
  $options$jscomp$107$$ >>>= 0;
  $adapterPtr$jscomp$1$$ >>>= 0;
  if ($options$jscomp$107$$) {
    $assert$$($options$jscomp$107$$);
    var $opts$jscomp$4_sp$jscomp$6$$ = {featureLevel:$WebGPU$FeatureLevel$$[$HEAP32$$[$options$jscomp$107$$ + 4 >>> 2 >>> 0]], powerPreference:$WebGPU$PowerPreference$$[$HEAP32$$[$options$jscomp$107$$ + 8 >>> 2 >>> 0]], forceFallbackAdapter:!!$HEAPU32$$[$options$jscomp$107$$ + 12 >>> 2 >>> 0]};
    $instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ = $HEAPU32$$[$options$jscomp$107$$ >>> 2 >>> 0];
    0 !== $instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ && ($assert$$(11 === $HEAP32$$[$instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ + 4 >>> 2 >>> 0]), $assert$$(0 === $HEAPU32$$[$instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ >>> 2 >>> 0]), $assert$$($instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$), $assert$$(0 === $HEAPU32$$[$instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ >>> 2 >>> 0]), $opts$jscomp$4_sp$jscomp$6$$.$xrCompatible$ = !!$HEAPU32$$[$instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ + 
    8 >>> 2 >>> 0]);
  }
  "gpu" in navigator ? $WebGPU$Internals$futureInsert$$($futureId$jscomp$2$$, navigator.gpu.requestAdapter($opts$jscomp$4_sp$jscomp$6$$).then($adapter$jscomp$1$$ => {
    $callUserCallback$$(() => {
      if ($adapter$jscomp$1$$) {
        $WebGPU$Internals$jsObjects$$[$adapterPtr$jscomp$1$$ >>> 0] = $adapter$jscomp$1$$, $_emwgpuOnRequestAdapterCompleted$$($futureId$jscomp$2$$, 1, $adapterPtr$jscomp$1$$, 0);
      } else {
        var $sp$jscomp$7$$ = $_emscripten_stack_get_current$$(), $messagePtr$jscomp$5$$ = $stringToUTF8OnStack$$("WebGPU not available on this browser (requestAdapter returned null)");
        $_emwgpuOnRequestAdapterCompleted$$($futureId$jscomp$2$$, 3, $adapterPtr$jscomp$1$$, $messagePtr$jscomp$5$$);
        $__emscripten_stack_restore$$($sp$jscomp$7$$);
      }
    });
  }, $ex$jscomp$2$$ => {
    $callUserCallback$$(() => {
      var $sp$jscomp$8$$ = $_emscripten_stack_get_current$$(), $messagePtr$jscomp$6$$ = $stringToUTF8OnStack$$($ex$jscomp$2$$.message);
      $_emwgpuOnRequestAdapterCompleted$$($futureId$jscomp$2$$, 4, $adapterPtr$jscomp$1$$, $messagePtr$jscomp$6$$);
      $__emscripten_stack_restore$$($sp$jscomp$8$$);
    });
  })) : ($opts$jscomp$4_sp$jscomp$6$$ = $_emscripten_stack_get_current$$(), $instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$ = $stringToUTF8OnStack$$("WebGPU not available on this browser (navigator.gpu is not available)"), $_emwgpuOnRequestAdapterCompleted$$($futureId$jscomp$2$$, 3, $adapterPtr$jscomp$1$$, $instancePtr_messagePtr$jscomp$4_nextInChainPtr$jscomp$1$$), $__emscripten_stack_restore$$($opts$jscomp$4_sp$jscomp$6$$));
}, environ_get:function($__environ$$, $environ_buf$$) {
  $__environ$$ >>>= 0;
  $environ_buf$$ >>>= 0;
  var $bufSize$jscomp$4$$ = 0, $envp$$ = 0, $string$jscomp$16$$;
  for ($string$jscomp$16$$ of $getEnvStrings$$()) {
    var $ptr$jscomp$50$$ = $environ_buf$$ + $bufSize$jscomp$4$$;
    $HEAPU32$$[$__environ$$ + $envp$$ >>> 2 >>> 0] = $ptr$jscomp$50$$;
    $bufSize$jscomp$4$$ += $stringToUTF8$$($string$jscomp$16$$, $ptr$jscomp$50$$, Infinity) + 1;
    $envp$$ += 4;
  }
  return 0;
}, environ_sizes_get:function($bufSize$jscomp$5_penviron_count$$, $penviron_buf_size$$) {
  $bufSize$jscomp$5_penviron_count$$ >>>= 0;
  $penviron_buf_size$$ >>>= 0;
  var $strings$jscomp$1$$ = $getEnvStrings$$();
  $HEAPU32$$[$bufSize$jscomp$5_penviron_count$$ >>> 2 >>> 0] = $strings$jscomp$1$$.length;
  $bufSize$jscomp$5_penviron_count$$ = 0;
  for (var $string$jscomp$17$$ of $strings$jscomp$1$$) {
    $bufSize$jscomp$5_penviron_count$$ += $lengthBytesUTF8$$($string$jscomp$17$$) + 1;
  }
  $HEAPU32$$[$penviron_buf_size$$ >>> 2 >>> 0] = $bufSize$jscomp$5_penviron_count$$;
  return 0;
}, fd_close:function($fd$jscomp$38$$) {
  try {
    var $stream$jscomp$57$$ = $FS$getStreamChecked$$($fd$jscomp$38$$);
    $FS$close$$($stream$jscomp$57$$);
    return 0;
  } catch ($e$jscomp$59$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$59$$.name) {
      throw $e$jscomp$59$$;
    }
    return $e$jscomp$59$$.$errno$;
  }
}, fd_fdstat_get:function($fd$jscomp$39$$, $pbuf$$) {
  $pbuf$$ >>>= 0;
  try {
    var $stream$jscomp$58$$ = $FS$getStreamChecked$$($fd$jscomp$39$$);
    $HEAP8$$[$pbuf$$ >>> 0] = $stream$jscomp$58$$.tty ? 2 : $FS$isDir$$($stream$jscomp$58$$.mode) ? 3 : 40960 === ($stream$jscomp$58$$.mode & 61440) ? 7 : 4;
    $HEAP16$$[$pbuf$$ + 2 >>> 1 >>> 0] = 0;
    $HEAP64$$[$pbuf$$ + 8 >>> 3 >>> 0] = BigInt(0);
    $HEAP64$$[$pbuf$$ + 16 >>> 3 >>> 0] = BigInt(0);
    return 0;
  } catch ($e$jscomp$60$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$60$$.name) {
      throw $e$jscomp$60$$;
    }
    return $e$jscomp$60$$.$errno$;
  }
}, fd_read:function($fd$jscomp$40_iov$jscomp$inline_326$$, $iov$jscomp$1_ret$jscomp$inline_329$$, $iovcnt$jscomp$1_iovcnt$jscomp$inline_327$$, $pnum$$) {
  $iov$jscomp$1_ret$jscomp$inline_329$$ >>>= 0;
  $iovcnt$jscomp$1_iovcnt$jscomp$inline_327$$ >>>= 0;
  $pnum$$ >>>= 0;
  try {
    a: {
      var $stream$jscomp$inline_325$$ = $FS$getStreamChecked$$($fd$jscomp$40_iov$jscomp$inline_326$$);
      $fd$jscomp$40_iov$jscomp$inline_326$$ = $iov$jscomp$1_ret$jscomp$inline_329$$;
      for (var $offset$jscomp$inline_328$$, $i$jscomp$inline_330$$ = $iov$jscomp$1_ret$jscomp$inline_329$$ = 0; $i$jscomp$inline_330$$ < $iovcnt$jscomp$1_iovcnt$jscomp$inline_327$$; $i$jscomp$inline_330$$++) {
        var $ptr$jscomp$inline_331$$ = $HEAPU32$$[$fd$jscomp$40_iov$jscomp$inline_326$$ >>> 2 >>> 0], $len$jscomp$inline_332$$ = $HEAPU32$$[$fd$jscomp$40_iov$jscomp$inline_326$$ + 4 >>> 2 >>> 0];
        $fd$jscomp$40_iov$jscomp$inline_326$$ += 8;
        var $stream$jscomp$inline_514$$ = $stream$jscomp$inline_325$$, $offset$jscomp$inline_515$$ = $ptr$jscomp$inline_331$$, $length$jscomp$inline_516$$ = $len$jscomp$inline_332$$, $position$jscomp$inline_517$$ = $offset$jscomp$inline_328$$, $buffer$jscomp$inline_518$$ = $HEAP8$$;
        $assert$$(0 <= $offset$jscomp$inline_515$$);
        if (0 > $length$jscomp$inline_516$$ || 0 > $position$jscomp$inline_517$$) {
          throw new $FS$ErrnoError$$(28);
        }
        if (null === $stream$jscomp$inline_514$$.fd) {
          throw new $FS$ErrnoError$$(8);
        }
        if (1 === ($stream$jscomp$inline_514$$.flags & 2097155)) {
          throw new $FS$ErrnoError$$(8);
        }
        if ($FS$isDir$$($stream$jscomp$inline_514$$.node.mode)) {
          throw new $FS$ErrnoError$$(31);
        }
        if (!$stream$jscomp$inline_514$$.$stream_ops$.read) {
          throw new $FS$ErrnoError$$(28);
        }
        var $seeking$jscomp$inline_519$$ = "undefined" != typeof $position$jscomp$inline_517$$;
        if (!$seeking$jscomp$inline_519$$) {
          $position$jscomp$inline_517$$ = $stream$jscomp$inline_514$$.position;
        } else if (!$stream$jscomp$inline_514$$.seekable) {
          throw new $FS$ErrnoError$$(70);
        }
        var $bytesRead$jscomp$inline_520$$ = $stream$jscomp$inline_514$$.$stream_ops$.read($stream$jscomp$inline_514$$, $buffer$jscomp$inline_518$$, $offset$jscomp$inline_515$$, $length$jscomp$inline_516$$, $position$jscomp$inline_517$$);
        $seeking$jscomp$inline_519$$ || ($stream$jscomp$inline_514$$.position += $bytesRead$jscomp$inline_520$$);
        var $curr$jscomp$inline_333$$ = $bytesRead$jscomp$inline_520$$;
        if (0 > $curr$jscomp$inline_333$$) {
          var $num$jscomp$8$$ = -1;
          break a;
        }
        $iov$jscomp$1_ret$jscomp$inline_329$$ += $curr$jscomp$inline_333$$;
        if ($curr$jscomp$inline_333$$ < $len$jscomp$inline_332$$) {
          break;
        }
        "undefined" != typeof $offset$jscomp$inline_328$$ && ($offset$jscomp$inline_328$$ += $curr$jscomp$inline_333$$);
      }
      $num$jscomp$8$$ = $iov$jscomp$1_ret$jscomp$inline_329$$;
    }
    $HEAPU32$$[$pnum$$ >>> 2 >>> 0] = $num$jscomp$8$$;
    return 0;
  } catch ($e$jscomp$61$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$61$$.name) {
      throw $e$jscomp$61$$;
    }
    return $e$jscomp$61$$.$errno$;
  }
}, fd_seek:function($fd$jscomp$41$$, $offset$jscomp$87$$, $whence$jscomp$2$$, $newOffset$$) {
  $offset$jscomp$87$$ = $bigintToI53Checked$$($offset$jscomp$87$$);
  $newOffset$$ >>>= 0;
  try {
    if (isNaN($offset$jscomp$87$$)) {
      return 61;
    }
    var $stream$jscomp$61$$ = $FS$getStreamChecked$$($fd$jscomp$41$$);
    $FS$llseek$$($stream$jscomp$61$$, $offset$jscomp$87$$, $whence$jscomp$2$$);
    $HEAP64$$[$newOffset$$ >>> 3 >>> 0] = BigInt($stream$jscomp$61$$.position);
    $stream$jscomp$61$$.$getdents$ && 0 === $offset$jscomp$87$$ && 0 === $whence$jscomp$2$$ && ($stream$jscomp$61$$.$getdents$ = null);
    return 0;
  } catch ($e$jscomp$62$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$62$$.name) {
      throw $e$jscomp$62$$;
    }
    return $e$jscomp$62$$.$errno$;
  }
}, fd_write:function($fd$jscomp$42_iov$jscomp$inline_336$$, $iov$jscomp$3_ret$jscomp$inline_339$$, $iovcnt$jscomp$3_iovcnt$jscomp$inline_337$$, $pnum$jscomp$1$$) {
  $iov$jscomp$3_ret$jscomp$inline_339$$ >>>= 0;
  $iovcnt$jscomp$3_iovcnt$jscomp$inline_337$$ >>>= 0;
  $pnum$jscomp$1$$ >>>= 0;
  try {
    a: {
      var $stream$jscomp$inline_335$$ = $FS$getStreamChecked$$($fd$jscomp$42_iov$jscomp$inline_336$$);
      $fd$jscomp$42_iov$jscomp$inline_336$$ = $iov$jscomp$3_ret$jscomp$inline_339$$;
      for (var $offset$jscomp$inline_338$$, $i$jscomp$inline_340$$ = $iov$jscomp$3_ret$jscomp$inline_339$$ = 0; $i$jscomp$inline_340$$ < $iovcnt$jscomp$3_iovcnt$jscomp$inline_337$$; $i$jscomp$inline_340$$++) {
        var $ptr$jscomp$inline_341$$ = $HEAPU32$$[$fd$jscomp$42_iov$jscomp$inline_336$$ >>> 2 >>> 0], $len$jscomp$inline_342$$ = $HEAPU32$$[$fd$jscomp$42_iov$jscomp$inline_336$$ + 4 >>> 2 >>> 0];
        $fd$jscomp$42_iov$jscomp$inline_336$$ += 8;
        var $curr$jscomp$inline_343$$ = $FS$write$$($stream$jscomp$inline_335$$, $HEAP8$$, $ptr$jscomp$inline_341$$, $len$jscomp$inline_342$$, $offset$jscomp$inline_338$$);
        if (0 > $curr$jscomp$inline_343$$) {
          var $num$jscomp$9$$ = -1;
          break a;
        }
        $iov$jscomp$3_ret$jscomp$inline_339$$ += $curr$jscomp$inline_343$$;
        if ($curr$jscomp$inline_343$$ < $len$jscomp$inline_342$$) {
          break;
        }
        "undefined" != typeof $offset$jscomp$inline_338$$ && ($offset$jscomp$inline_338$$ += $curr$jscomp$inline_343$$);
      }
      $num$jscomp$9$$ = $iov$jscomp$3_ret$jscomp$inline_339$$;
    }
    $HEAPU32$$[$pnum$jscomp$1$$ >>> 2 >>> 0] = $num$jscomp$9$$;
    return 0;
  } catch ($e$jscomp$63$$) {
    if ("undefined" == typeof $FS$$ || "ErrnoError" !== $e$jscomp$63$$.name) {
      throw $e$jscomp$63$$;
    }
    return $e$jscomp$63$$.$errno$;
  }
}, wgpuBufferGetSize:function($bufferPtr$jscomp$2_ret$jscomp$18$$) {
  $bufferPtr$jscomp$2_ret$jscomp$18$$ = $WebGPU$getJsObject$$($bufferPtr$jscomp$2_ret$jscomp$18$$ >>> 0).size;
  return BigInt($bufferPtr$jscomp$2_ret$jscomp$18$$);
}, wgpuCommandEncoderBeginRenderPass:function($encoderPtr_ptr$jscomp$53$$, $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$) {
  $encoderPtr_ptr$jscomp$53$$ >>>= 0;
  $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$ >>>= 0;
  $assert$$($desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$);
  var $JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ = $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$;
  $assert$$($JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$);
  var $JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ >>> 2 >>> 0];
  $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$ = void 0;
  0 !== $JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ && ($assert$$(3 === $HEAP32$$[$JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ + 4 >>> 2 >>> 0]), $assert$$(0 === $HEAPU32$$[$JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ >>> 2 >>> 0]), $assert$$($JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$), $assert$$(0 === $HEAPU32$$[$JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ >>> 
  2 >>> 0]), $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$ = $readI53FromI64$$($JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ + 8));
  $JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ = $WebGPU$makeStringFromOptionalStringView$$($JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 4);
  for (var $JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 12 >>> 2 >>> 0], $JSCompiler_temp_const$jscomp$inline_595_caPtr$jscomp$inline_584$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 16 >>> 2 >>> 0], $attachments$jscomp$inline_585$$ = [], $i$jscomp$inline_586$$ = 0; $i$jscomp$inline_586$$ < 
  $JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$; ++$i$jscomp$inline_586$$) {
    var $JSCompiler_temp_const$jscomp$inline_587$$ = $attachments$jscomp$inline_585$$, $JSCompiler_temp_const$jscomp$inline_588$$ = $JSCompiler_temp_const$jscomp$inline_587$$.push;
    var $JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ = $JSCompiler_temp_const$jscomp$inline_595_caPtr$jscomp$inline_584$$ + 56 * $i$jscomp$inline_586$$;
    var $JSCompiler_temp_const$jscomp$632_viewPtr$jscomp$inline_591$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ + 4 >>> 2 >>> 0];
    if (0 !== $JSCompiler_temp_const$jscomp$632_viewPtr$jscomp$inline_591$$) {
      var $JSCompiler_temp_const$jscomp$631_depthSlice$jscomp$inline_592$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ + 8 >>> 2 >>> 0];
      4294967295 == $JSCompiler_temp_const$jscomp$631_depthSlice$jscomp$inline_592$$ && ($JSCompiler_temp_const$jscomp$631_depthSlice$jscomp$inline_592$$ = void 0);
      $JSCompiler_temp_const$jscomp$632_viewPtr$jscomp$inline_591$$ = $WebGPU$getJsObject$$($JSCompiler_temp_const$jscomp$632_viewPtr$jscomp$inline_591$$);
      var $JSCompiler_temp_const$jscomp$630$$ = $WebGPU$getJsObject$$($HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ + 12 >>> 2 >>> 0]), $ptr$jscomp$inline_639$$ = $JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ + 24;
      $JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ = {view:$JSCompiler_temp_const$jscomp$632_viewPtr$jscomp$inline_591$$, depthSlice:$JSCompiler_temp_const$jscomp$631_depthSlice$jscomp$inline_592$$, resolveTarget:$JSCompiler_temp_const$jscomp$630$$, clearValue:{r:$HEAPF64$$[$ptr$jscomp$inline_639$$ >>> 3 >>> 0], g:$HEAPF64$$[$ptr$jscomp$inline_639$$ + 8 >>> 3 >>> 0], b:$HEAPF64$$[$ptr$jscomp$inline_639$$ + 16 >>> 3 >>> 0], a:$HEAPF64$$[$ptr$jscomp$inline_639$$ + 24 >>> 3 >>> 
      0]}, loadOp:$WebGPU$LoadOp$$[$HEAP32$$[$JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ + 16 >>> 2 >>> 0]], storeOp:$WebGPU$StoreOp$$[$HEAP32$$[$JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ + 20 >>> 2 >>> 0]]};
    } else {
      $JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$ = void 0;
    }
    $JSCompiler_temp_const$jscomp$inline_588$$.call($JSCompiler_temp_const$jscomp$inline_587$$, $JSCompiler_inline_result$jscomp$inline_589_caPtr$jscomp$inline_590$$);
  }
  $JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 20 >>> 2 >>> 0];
  $JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ = 0 !== $JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ ? {view:$WebGPU$getJsObject$$($HEAPU32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 4 >>> 2 >>> 0]), depthClearValue:$HEAPF32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 16 >>> 2 >>> 0], depthLoadOp:$WebGPU$LoadOp$$[$HEAP32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 
  8 >>> 2 >>> 0]], depthStoreOp:$WebGPU$StoreOp$$[$HEAP32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 12 >>> 2 >>> 0]], depthReadOnly:!!$HEAPU32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 20 >>> 2 >>> 0], stencilClearValue:$HEAPU32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 32 >>> 2 >>> 0], stencilLoadOp:$WebGPU$LoadOp$$[$HEAP32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 
  24 >>> 2 >>> 0]], stencilStoreOp:$WebGPU$StoreOp$$[$HEAP32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 28 >>> 2 >>> 0]], stencilReadOnly:!!$HEAPU32$$[$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$ + 36 >>> 2 >>> 0]} : void 0;
  $JSCompiler_temp_const$jscomp$inline_595_caPtr$jscomp$inline_584$$ = $WebGPU$getJsObject$$($HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 24 >>> 2 >>> 0]);
  $JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 28 >>> 2 >>> 0];
  $JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ = 0 !== $JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ ? {querySet:$WebGPU$getJsObject$$($HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 4 >>> 2 >>> 0]), beginningOfPassWriteIndex:$HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 
  8 >>> 2 >>> 0], endOfPassWriteIndex:$HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$ + 12 >>> 2 >>> 0]} : void 0;
  $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$ = {label:$JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$, colorAttachments:$attachments$jscomp$inline_585$$, depthStencilAttachment:$JSCompiler_temp_const$jscomp$inline_593_count$jscomp$inline_583_dsaPtr$jscomp$inline_594$$, occlusionQuerySet:$JSCompiler_temp_const$jscomp$inline_595_caPtr$jscomp$inline_584$$, timestampWrites:$JSCompiler_inline_result$jscomp$inline_596_descriptor$jscomp$inline_579_ptr$jscomp$inline_597$$, 
  maxDrawCount:$desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$};
  $JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$ = $WebGPU$getJsObject$$($encoderPtr_ptr$jscomp$53$$);
  $encoderPtr_ptr$jscomp$53$$ = $_emwgpuCreateRenderPassEncoder$$(0);
  $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$ = $JSCompiler_temp_const$jscomp$inline_582_commandEncoder_nextInChainPtr$jscomp$inline_580$$.beginRenderPass($desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$);
  $WebGPU$Internals$jsObjects$$[$encoderPtr_ptr$jscomp$53$$ >>> 0] = $desc$jscomp$8_descriptor$jscomp$6_jsObject$jscomp$inline_642_maxDrawCount$jscomp$inline_581$$;
  return $encoderPtr_ptr$jscomp$53$$;
}, wgpuCommandEncoderFinish:function($encoderPtr$jscomp$1_ptr$jscomp$54$$) {
  var $commandEncoder$jscomp$1_jsObject$jscomp$inline_355$$ = $WebGPU$getJsObject$$($encoderPtr$jscomp$1_ptr$jscomp$54$$ >>> 0);
  $encoderPtr$jscomp$1_ptr$jscomp$54$$ = $_emwgpuCreateCommandBuffer$$(0);
  $commandEncoder$jscomp$1_jsObject$jscomp$inline_355$$ = $commandEncoder$jscomp$1_jsObject$jscomp$inline_355$$.finish();
  $WebGPU$Internals$jsObjects$$[$encoderPtr$jscomp$1_ptr$jscomp$54$$ >>> 0] = $commandEncoder$jscomp$1_jsObject$jscomp$inline_355$$;
  return $encoderPtr$jscomp$1_ptr$jscomp$54$$;
}, wgpuDeviceCreateBindGroup:function($devicePtr$jscomp$5_ptr$jscomp$55$$, $descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$) {
  $devicePtr$jscomp$5_ptr$jscomp$55$$ >>>= 0;
  $descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ >>>= 0;
  $assert$$($descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$);
  $assert$$(0 === $HEAPU32$$[$descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ >>> 2 >>> 0]);
  var $JSCompiler_temp_const$jscomp$427_desc$jscomp$10_jsObject$jscomp$inline_601$$ = $WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ + 4), $JSCompiler_temp_const$jscomp$426_device$jscomp$6$$ = $WebGPU$getJsObject$$($HEAPU32$$[$descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ + 12 >>> 2 >>> 0]), $count$jscomp$inline_526$$ = $HEAPU32$$[$descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ + 16 >>> 2 >>> 0];
  $descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ = $HEAPU32$$[$descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ + 20 >>> 2 >>> 0];
  for (var $entries$jscomp$inline_528$$ = [], $i$jscomp$inline_529$$ = 0; $i$jscomp$inline_529$$ < $count$jscomp$inline_526$$; ++$i$jscomp$inline_529$$) {
    var $JSCompiler_temp_const$jscomp$inline_530$$ = $entries$jscomp$inline_528$$, $JSCompiler_temp_const$jscomp$inline_531$$ = $JSCompiler_temp_const$jscomp$inline_530$$.push;
    var $JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ = $descriptor$jscomp$9_entriesPtrs$jscomp$inline_527$$ + 40 * $i$jscomp$inline_529$$;
    $assert$$($JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$);
    var $bufferPtr$jscomp$inline_534$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ + 8 >>> 2 >>> 0], $samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ + 32 >>> 2 >>> 0], $textureViewPtr$jscomp$inline_536$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ + 36 >>> 2 >>> 0];
    $assert$$(1 === (0 !== $bufferPtr$jscomp$inline_534$$) + (0 !== $samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$) + (0 !== $textureViewPtr$jscomp$inline_536$$));
    var $binding$jscomp$inline_537$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ + 4 >>> 2 >>> 0];
    $bufferPtr$jscomp$inline_534$$ ? ($samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$ = $readI53FromI64$$($JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ + 24), -1 == $samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$ && ($samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$ = void 0), $JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ = {binding:$binding$jscomp$inline_537$$, resource:{buffer:$WebGPU$getJsObject$$($bufferPtr$jscomp$inline_534$$), 
    offset:$readI53FromI64$$($JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ + 16), size:$samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$}}) : $JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$ = $samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$ ? {binding:$binding$jscomp$inline_537$$, resource:$WebGPU$getJsObject$$($samplerPtr$jscomp$inline_535_size$jscomp$inline_538$$)} : {binding:$binding$jscomp$inline_537$$, resource:$WebGPU$getJsObject$$($textureViewPtr$jscomp$inline_536$$)};
    $JSCompiler_temp_const$jscomp$inline_531$$.call($JSCompiler_temp_const$jscomp$inline_530$$, $JSCompiler_inline_result$jscomp$inline_532_entryPtr$jscomp$inline_533$$);
  }
  $JSCompiler_temp_const$jscomp$427_desc$jscomp$10_jsObject$jscomp$inline_601$$ = {label:$JSCompiler_temp_const$jscomp$427_desc$jscomp$10_jsObject$jscomp$inline_601$$, layout:$JSCompiler_temp_const$jscomp$426_device$jscomp$6$$, entries:$entries$jscomp$inline_528$$};
  $JSCompiler_temp_const$jscomp$426_device$jscomp$6$$ = $WebGPU$getJsObject$$($devicePtr$jscomp$5_ptr$jscomp$55$$);
  $devicePtr$jscomp$5_ptr$jscomp$55$$ = $_emwgpuCreateBindGroup$$(0);
  $JSCompiler_temp_const$jscomp$427_desc$jscomp$10_jsObject$jscomp$inline_601$$ = $JSCompiler_temp_const$jscomp$426_device$jscomp$6$$.createBindGroup($JSCompiler_temp_const$jscomp$427_desc$jscomp$10_jsObject$jscomp$inline_601$$);
  $WebGPU$Internals$jsObjects$$[$devicePtr$jscomp$5_ptr$jscomp$55$$ >>> 0] = $JSCompiler_temp_const$jscomp$427_desc$jscomp$10_jsObject$jscomp$inline_601$$;
  return $devicePtr$jscomp$5_ptr$jscomp$55$$;
}, wgpuDeviceCreateBindGroupLayout:function($devicePtr$jscomp$6_ptr$jscomp$56$$, $descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$) {
  $devicePtr$jscomp$6_ptr$jscomp$56$$ >>>= 0;
  $descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ >>>= 0;
  $assert$$($descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$);
  $assert$$(0 === $HEAPU32$$[$descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ >>> 2 >>> 0]);
  var $JSCompiler_temp_const$jscomp$570_desc$jscomp$11_jsObject$jscomp$inline_645$$ = $WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ + 4), $count$jscomp$inline_603_device$jscomp$7$$ = $HEAPU32$$[$descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ + 12 >>> 2 >>> 0];
  $descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ = $HEAPU32$$[$descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ + 16 >>> 2 >>> 0];
  for (var $entries$jscomp$inline_605$$ = [], $i$jscomp$inline_606$$ = 0; $i$jscomp$inline_606$$ < $count$jscomp$inline_603_device$jscomp$7$$; ++$i$jscomp$inline_606$$) {
    var $JSCompiler_temp_const$jscomp$inline_607$$ = $entries$jscomp$inline_605$$, $JSCompiler_temp_const$jscomp$inline_608$$ = $JSCompiler_temp_const$jscomp$inline_607$$.push, $JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ = $descriptor$jscomp$10_entriesPtrs$jscomp$inline_604$$ + 88 * $i$jscomp$inline_606$$;
    $assert$$($JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$);
    var $JSCompiler_temp_const$jscomp$inline_611_bindingArraySize$jscomp$inline_610$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 16 >>> 2 >>> 0];
    $assert$$(0 == $JSCompiler_temp_const$jscomp$inline_611_bindingArraySize$jscomp$inline_610$$ || 1 == $JSCompiler_temp_const$jscomp$inline_611_bindingArraySize$jscomp$inline_610$$);
    $JSCompiler_temp_const$jscomp$inline_611_bindingArraySize$jscomp$inline_610$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 4 >>> 2 >>> 0];
    var $JSCompiler_temp_const$jscomp$inline_612$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 8 >>> 2 >>> 0];
    var $JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$ = $JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 24;
    $assert$$($JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$);
    var $JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$ + 4 >>> 2 >>> 0];
    $JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$ = $JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$ ? {type:$WebGPU$BufferBindingType$$[$JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$], hasDynamicOffset:!!$HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$ + 
    8 >>> 2 >>> 0], minBindingSize:$readI53FromI64$$($JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$ + 16)} : void 0;
    $JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$ = $JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 48;
    $assert$$($JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$);
    $JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$ = ($JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$ + 
    4 >>> 2 >>> 0]) ? {type:$WebGPU$SamplerBindingType$$[$JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$]} : void 0;
    var $JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$ = $JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 56;
    $assert$$($JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$);
    var $accessInt$jscomp$inline_627_sampleTypeInt$jscomp$inline_623$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$ + 4 >>> 2 >>> 0];
    $JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$ = $accessInt$jscomp$inline_627_sampleTypeInt$jscomp$inline_623$$ ? {sampleType:$WebGPU$TextureSampleType$$[$accessInt$jscomp$inline_627_sampleTypeInt$jscomp$inline_623$$], viewDimension:$WebGPU$TextureViewDimension$$[$HEAP32$$[$JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$ + 8 >>> 2 >>> 0]], multisampled:!!$HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$ + 
    12 >>> 2 >>> 0]} : void 0;
    $JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ += 72;
    $assert$$($JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$);
    $JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ = ($accessInt$jscomp$inline_627_sampleTypeInt$jscomp$inline_623$$ = $HEAPU32$$[$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 4 >>> 2 >>> 0]) ? {access:$WebGPU$StorageTextureAccess$$[$accessInt$jscomp$inline_627_sampleTypeInt$jscomp$inline_623$$], format:$WebGPU$TextureFormat$$[$HEAP32$$[$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 
    8 >>> 2 >>> 0]], viewDimension:$WebGPU$TextureViewDimension$$[$HEAP32$$[$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$ + 12 >>> 2 >>> 0]]} : void 0;
    $JSCompiler_temp_const$jscomp$inline_608$$.call($JSCompiler_temp_const$jscomp$inline_607$$, {binding:$JSCompiler_temp_const$jscomp$inline_611_bindingArraySize$jscomp$inline_610$$, visibility:$JSCompiler_temp_const$jscomp$inline_612$$, buffer:$JSCompiler_inline_result$jscomp$inline_613_JSCompiler_temp_const$jscomp$inline_616_entryPtr$jscomp$inline_614$$, sampler:$JSCompiler_inline_result$jscomp$inline_617_JSCompiler_temp_const$jscomp$inline_620_entryPtr$jscomp$inline_618_typeInt$jscomp$inline_615_typeInt$jscomp$inline_619$$, 
    texture:$JSCompiler_inline_result$jscomp$inline_621_JSCompiler_temp_const$jscomp$inline_624_entryPtr$jscomp$inline_622$$, storageTexture:$JSCompiler_inline_result$jscomp$inline_625_entryPtr$jscomp$inline_609_entryPtr$jscomp$inline_626$$});
  }
  $JSCompiler_temp_const$jscomp$570_desc$jscomp$11_jsObject$jscomp$inline_645$$ = {label:$JSCompiler_temp_const$jscomp$570_desc$jscomp$11_jsObject$jscomp$inline_645$$, entries:$entries$jscomp$inline_605$$};
  $count$jscomp$inline_603_device$jscomp$7$$ = $WebGPU$getJsObject$$($devicePtr$jscomp$6_ptr$jscomp$56$$);
  $devicePtr$jscomp$6_ptr$jscomp$56$$ = $_emwgpuCreateBindGroupLayout$$(0);
  $JSCompiler_temp_const$jscomp$570_desc$jscomp$11_jsObject$jscomp$inline_645$$ = $count$jscomp$inline_603_device$jscomp$7$$.createBindGroupLayout($JSCompiler_temp_const$jscomp$570_desc$jscomp$11_jsObject$jscomp$inline_645$$);
  $WebGPU$Internals$jsObjects$$[$devicePtr$jscomp$6_ptr$jscomp$56$$ >>> 0] = $JSCompiler_temp_const$jscomp$570_desc$jscomp$11_jsObject$jscomp$inline_645$$;
  return $devicePtr$jscomp$6_ptr$jscomp$56$$;
}, wgpuDeviceCreateCommandEncoder:function($devicePtr$jscomp$7_ptr$jscomp$57$$, $descriptor$jscomp$11_device$jscomp$8$$) {
  $devicePtr$jscomp$7_ptr$jscomp$57$$ >>>= 0;
  $descriptor$jscomp$11_device$jscomp$8$$ >>>= 0;
  if ($descriptor$jscomp$11_device$jscomp$8$$) {
    $assert$$($descriptor$jscomp$11_device$jscomp$8$$);
    $assert$$(0 === $HEAPU32$$[$descriptor$jscomp$11_device$jscomp$8$$ >>> 2 >>> 0]);
    var $desc$jscomp$12_jsObject$jscomp$inline_368$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$11_device$jscomp$8$$ + 4)};
  }
  $descriptor$jscomp$11_device$jscomp$8$$ = $WebGPU$getJsObject$$($devicePtr$jscomp$7_ptr$jscomp$57$$);
  $devicePtr$jscomp$7_ptr$jscomp$57$$ = $_emwgpuCreateCommandEncoder$$(0);
  $desc$jscomp$12_jsObject$jscomp$inline_368$$ = $descriptor$jscomp$11_device$jscomp$8$$.createCommandEncoder($desc$jscomp$12_jsObject$jscomp$inline_368$$);
  $WebGPU$Internals$jsObjects$$[$devicePtr$jscomp$7_ptr$jscomp$57$$ >>> 0] = $desc$jscomp$12_jsObject$jscomp$inline_368$$;
  return $devicePtr$jscomp$7_ptr$jscomp$57$$;
}, wgpuDeviceCreatePipelineLayout:function($devicePtr$jscomp$8_ptr$jscomp$58$$, $desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$) {
  $devicePtr$jscomp$8_ptr$jscomp$58$$ >>>= 0;
  $desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ >>>= 0;
  $assert$$($desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$);
  $assert$$(0 === $HEAPU32$$[$desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ >>> 2 >>> 0]);
  for (var $bglCount_device$jscomp$9$$ = $HEAPU32$$[$desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ + 12 >>> 2 >>> 0], $bglPtr$$ = $HEAPU32$$[$desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ + 16 >>> 2 >>> 0], $bgls$$ = [], $i$jscomp$65$$ = 0; $i$jscomp$65$$ < $bglCount_device$jscomp$9$$; ++$i$jscomp$65$$) {
    $bgls$$.push($WebGPU$getJsObject$$($HEAPU32$$[$bglPtr$$ + 4 * $i$jscomp$65$$ >>> 2 >>> 0]));
  }
  $desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ + 4), bindGroupLayouts:$bgls$$};
  $bglCount_device$jscomp$9$$ = $WebGPU$getJsObject$$($devicePtr$jscomp$8_ptr$jscomp$58$$);
  $devicePtr$jscomp$8_ptr$jscomp$58$$ = $_emwgpuCreatePipelineLayout$$(0);
  $desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$ = $bglCount_device$jscomp$9$$.createPipelineLayout($desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$);
  $WebGPU$Internals$jsObjects$$[$devicePtr$jscomp$8_ptr$jscomp$58$$ >>> 0] = $desc$jscomp$13_descriptor$jscomp$12_jsObject$jscomp$inline_371$$;
  return $devicePtr$jscomp$8_ptr$jscomp$58$$;
}, wgpuDeviceCreateRenderPipeline:function($devicePtr$jscomp$9_ptr$jscomp$59$$, $desc$jscomp$14_descriptor$jscomp$13_jsObject$jscomp$inline_374$$) {
  $devicePtr$jscomp$9_ptr$jscomp$59$$ >>>= 0;
  $desc$jscomp$14_descriptor$jscomp$13_jsObject$jscomp$inline_374$$ = $WebGPU$makeRenderPipelineDesc$$($desc$jscomp$14_descriptor$jscomp$13_jsObject$jscomp$inline_374$$ >>> 0);
  var $device$jscomp$10$$ = $WebGPU$getJsObject$$($devicePtr$jscomp$9_ptr$jscomp$59$$);
  $devicePtr$jscomp$9_ptr$jscomp$59$$ = $_emwgpuCreateRenderPipeline$$(0);
  $desc$jscomp$14_descriptor$jscomp$13_jsObject$jscomp$inline_374$$ = $device$jscomp$10$$.createRenderPipeline($desc$jscomp$14_descriptor$jscomp$13_jsObject$jscomp$inline_374$$);
  $WebGPU$Internals$jsObjects$$[$devicePtr$jscomp$9_ptr$jscomp$59$$ >>> 0] = $desc$jscomp$14_descriptor$jscomp$13_jsObject$jscomp$inline_374$$;
  return $devicePtr$jscomp$9_ptr$jscomp$59$$;
}, wgpuDeviceCreateTexture:function($device$jscomp$11_devicePtr$jscomp$10$$, $descriptor$jscomp$14_viewFormatsPtr$$) {
  $device$jscomp$11_devicePtr$jscomp$10$$ >>>= 0;
  $descriptor$jscomp$14_viewFormatsPtr$$ >>>= 0;
  $assert$$($descriptor$jscomp$14_viewFormatsPtr$$);
  $assert$$(0 === $HEAPU32$$[$descriptor$jscomp$14_viewFormatsPtr$$ >>> 2 >>> 0]);
  var $desc$jscomp$15$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$14_viewFormatsPtr$$ + 4), size:$WebGPU$makeExtent3D$$($descriptor$jscomp$14_viewFormatsPtr$$ + 28), mipLevelCount:$HEAPU32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 44 >>> 2 >>> 0], sampleCount:$HEAPU32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 48 >>> 2 >>> 0], dimension:$WebGPU$TextureDimension$$[$HEAP32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 24 >>> 2 >>> 0]], format:$WebGPU$TextureFormat$$[$HEAP32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 
  40 >>> 2 >>> 0]], usage:$HEAPU32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 16 >>> 2 >>> 0]}, $ptr$jscomp$60_viewFormatCount$$ = $HEAPU32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 52 >>> 2 >>> 0];
  $ptr$jscomp$60_viewFormatCount$$ && ($descriptor$jscomp$14_viewFormatsPtr$$ = $HEAPU32$$[$descriptor$jscomp$14_viewFormatsPtr$$ + 56 >>> 2 >>> 0], $desc$jscomp$15$$.viewFormats = Array.from($HEAP32$$.subarray($descriptor$jscomp$14_viewFormatsPtr$$ >>> 2 >>> 0, $descriptor$jscomp$14_viewFormatsPtr$$ + 4 * $ptr$jscomp$60_viewFormatCount$$ >>> 2 >>> 0), $format$jscomp$28$$ => $WebGPU$TextureFormat$$[$format$jscomp$28$$]));
  $device$jscomp$11_devicePtr$jscomp$10$$ = $WebGPU$getJsObject$$($device$jscomp$11_devicePtr$jscomp$10$$);
  $ptr$jscomp$60_viewFormatCount$$ = $_emwgpuCreateTexture$$(0);
  $WebGPU$Internals$jsObjectInsert$$($ptr$jscomp$60_viewFormatCount$$, $device$jscomp$11_devicePtr$jscomp$10$$.createTexture($desc$jscomp$15$$));
  return $ptr$jscomp$60_viewFormatCount$$;
}, wgpuInstanceCreateSurface:function($context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$, $descriptor$jscomp$15_ptr$jscomp$61$$) {
  $descriptor$jscomp$15_ptr$jscomp$61$$ >>>= 0;
  $assert$$($descriptor$jscomp$15_ptr$jscomp$61$$);
  $context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$ = $HEAPU32$$[$descriptor$jscomp$15_ptr$jscomp$61$$ >>> 2 >>> 0];
  $assert$$(0 !== $context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$);
  $assert$$(262144 === $HEAP32$$[$context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$ + 4 >>> 2 >>> 0]);
  $assert$$($context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$);
  $assert$$(0 === $HEAPU32$$[$context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$ >>> 2 >>> 0]);
  $context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$ = $HEAPU32$$[$context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$ + 8 >>> 2 >>> 0];
  $assert$$($context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$);
  $context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$ = $findEventTarget$$($context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$).getContext("webgpu");
  $assert$$($context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$);
  if (!$context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$) {
    return 0;
  }
  $context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$.$surfaceLabelWebGPU$ = $WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$15_ptr$jscomp$61$$ + 4);
  $descriptor$jscomp$15_ptr$jscomp$61$$ = $_emwgpuCreateSurface$$(0);
  $WebGPU$Internals$jsObjects$$[$descriptor$jscomp$15_ptr$jscomp$61$$ >>> 0] = $context$jscomp$8_instancePtr$jscomp$1_nextInChainPtr$jscomp$3_selectorPtr$$;
  return $descriptor$jscomp$15_ptr$jscomp$61$$;
}, wgpuQueueSubmit:function($queue_queuePtr$jscomp$2$$, $cmds_commandCount$$, $commands$$) {
  $queue_queuePtr$jscomp$2$$ >>>= 0;
  $cmds_commandCount$$ >>>= 0;
  $commands$$ >>>= 0;
  $assert$$(0 === $commands$$ % 4);
  $queue_queuePtr$jscomp$2$$ = $WebGPU$getJsObject$$($queue_queuePtr$jscomp$2$$);
  $cmds_commandCount$$ = Array.from($HEAP32$$.subarray($commands$$ >>> 2 >>> 0, $commands$$ + 4 * $cmds_commandCount$$ >>> 2 >>> 0), $id$jscomp$35$$ => $WebGPU$getJsObject$$($id$jscomp$35$$));
  $queue_queuePtr$jscomp$2$$.submit($cmds_commandCount$$);
}, wgpuQueueWriteBuffer:function($queue$jscomp$1_queuePtr$jscomp$3$$, $buffer$jscomp$48_bufferPtr$jscomp$4$$, $bufferOffset$$, $data$jscomp$103_subarray$$, $size$jscomp$40$$) {
  $buffer$jscomp$48_bufferPtr$jscomp$4$$ >>>= 0;
  $bufferOffset$$ = $bigintToI53Checked$$($bufferOffset$$);
  $data$jscomp$103_subarray$$ >>>= 0;
  $size$jscomp$40$$ >>>= 0;
  $queue$jscomp$1_queuePtr$jscomp$3$$ = $WebGPU$getJsObject$$($queue$jscomp$1_queuePtr$jscomp$3$$ >>> 0);
  $buffer$jscomp$48_bufferPtr$jscomp$4$$ = $WebGPU$getJsObject$$($buffer$jscomp$48_bufferPtr$jscomp$4$$);
  $data$jscomp$103_subarray$$ = $HEAPU8$$.subarray($data$jscomp$103_subarray$$ >>> 0, $data$jscomp$103_subarray$$ + $size$jscomp$40$$ >>> 0);
  $queue$jscomp$1_queuePtr$jscomp$3$$.writeBuffer($buffer$jscomp$48_bufferPtr$jscomp$4$$, $bufferOffset$$, $data$jscomp$103_subarray$$, 0, $size$jscomp$40$$);
}, wgpuRenderPassEncoderDrawIndexed:function($passPtr$$, $indexCount$$, $instanceCount$jscomp$2$$, $firstIndex$$, $baseVertex$$, $firstInstance$$) {
  $passPtr$$ >>>= 0;
  $assert$$(0 <= $indexCount$$);
  $assert$$(0 <= $instanceCount$jscomp$2$$);
  $firstIndex$$ >>>= 0;
  $firstInstance$$ >>>= 0;
  $WebGPU$getJsObject$$($passPtr$$).drawIndexed($indexCount$$, $instanceCount$jscomp$2$$, $firstIndex$$, $baseVertex$$, $firstInstance$$);
}, wgpuRenderPassEncoderEnd:function($encoderPtr$jscomp$2$$) {
  $WebGPU$getJsObject$$($encoderPtr$jscomp$2$$ >>> 0).end();
}, wgpuRenderPassEncoderSetBindGroup:function($pass$jscomp$1_passPtr$jscomp$1$$, $groupIndex$$, $group_groupPtr$$, $dynamicOffsetCount$$, $dynamicOffsetsPtr$$) {
  $pass$jscomp$1_passPtr$jscomp$1$$ >>>= 0;
  $group_groupPtr$$ >>>= 0;
  $dynamicOffsetCount$$ >>>= 0;
  $dynamicOffsetsPtr$$ >>>= 0;
  $assert$$(0 <= $groupIndex$$);
  $pass$jscomp$1_passPtr$jscomp$1$$ = $WebGPU$getJsObject$$($pass$jscomp$1_passPtr$jscomp$1$$);
  $group_groupPtr$$ = $WebGPU$getJsObject$$($group_groupPtr$$);
  0 == $dynamicOffsetCount$$ ? $pass$jscomp$1_passPtr$jscomp$1$$.setBindGroup($groupIndex$$, $group_groupPtr$$) : $pass$jscomp$1_passPtr$jscomp$1$$.setBindGroup($groupIndex$$, $group_groupPtr$$, $HEAPU32$$, $dynamicOffsetsPtr$$ >>> 2, $dynamicOffsetCount$$);
}, wgpuRenderPassEncoderSetIndexBuffer:function($pass$jscomp$2_passPtr$jscomp$2$$, $buffer$jscomp$49_bufferPtr$jscomp$5$$, $format$jscomp$29$$, $offset$jscomp$89$$, $size$jscomp$41$$) {
  $buffer$jscomp$49_bufferPtr$jscomp$5$$ >>>= 0;
  $offset$jscomp$89$$ = $bigintToI53Checked$$($offset$jscomp$89$$);
  $size$jscomp$41$$ = $bigintToI53Checked$$($size$jscomp$41$$);
  $pass$jscomp$2_passPtr$jscomp$2$$ = $WebGPU$getJsObject$$($pass$jscomp$2_passPtr$jscomp$2$$ >>> 0);
  $buffer$jscomp$49_bufferPtr$jscomp$5$$ = $WebGPU$getJsObject$$($buffer$jscomp$49_bufferPtr$jscomp$5$$);
  -1 == $size$jscomp$41$$ && ($size$jscomp$41$$ = void 0);
  $pass$jscomp$2_passPtr$jscomp$2$$.setIndexBuffer($buffer$jscomp$49_bufferPtr$jscomp$5$$, $WebGPU$IndexFormat$$[$format$jscomp$29$$], $offset$jscomp$89$$, $size$jscomp$41$$);
}, wgpuRenderPassEncoderSetPipeline:function($pass$jscomp$3_passPtr$jscomp$3$$, $pipeline_pipelinePtr$$) {
  $pipeline_pipelinePtr$$ >>>= 0;
  $pass$jscomp$3_passPtr$jscomp$3$$ = $WebGPU$getJsObject$$($pass$jscomp$3_passPtr$jscomp$3$$ >>> 0);
  $pipeline_pipelinePtr$$ = $WebGPU$getJsObject$$($pipeline_pipelinePtr$$);
  $pass$jscomp$3_passPtr$jscomp$3$$.setPipeline($pipeline_pipelinePtr$$);
}, wgpuRenderPassEncoderSetVertexBuffer:function($pass$jscomp$4_passPtr$jscomp$4$$, $slot$$, $buffer$jscomp$50_bufferPtr$jscomp$6$$, $offset$jscomp$90$$, $size$jscomp$42$$) {
  $pass$jscomp$4_passPtr$jscomp$4$$ >>>= 0;
  $buffer$jscomp$50_bufferPtr$jscomp$6$$ >>>= 0;
  $offset$jscomp$90$$ = $bigintToI53Checked$$($offset$jscomp$90$$);
  $size$jscomp$42$$ = $bigintToI53Checked$$($size$jscomp$42$$);
  $assert$$(0 <= $slot$$);
  $pass$jscomp$4_passPtr$jscomp$4$$ = $WebGPU$getJsObject$$($pass$jscomp$4_passPtr$jscomp$4$$);
  $buffer$jscomp$50_bufferPtr$jscomp$6$$ = $WebGPU$getJsObject$$($buffer$jscomp$50_bufferPtr$jscomp$6$$);
  -1 == $size$jscomp$42$$ && ($size$jscomp$42$$ = void 0);
  $pass$jscomp$4_passPtr$jscomp$4$$.setVertexBuffer($slot$$, $buffer$jscomp$50_bufferPtr$jscomp$6$$, $offset$jscomp$90$$, $size$jscomp$42$$);
}, wgpuSurfaceConfigure:function($context$jscomp$9_surfacePtr$$, $config$jscomp$6_nextInChainPtr$jscomp$4$$) {
  $context$jscomp$9_surfacePtr$$ >>>= 0;
  $config$jscomp$6_nextInChainPtr$jscomp$4$$ >>>= 0;
  $assert$$($config$jscomp$6_nextInChainPtr$jscomp$4$$);
  $context$jscomp$9_surfacePtr$$ = $WebGPU$getJsObject$$($context$jscomp$9_surfacePtr$$);
  var $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$ = $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 44 >>> 2 >>> 0];
  $assert$$(1 === $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$ || 0 === $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$);
  $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$ = [$HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 24 >>> 2 >>> 0], $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 28 >>> 2 >>> 0]];
  0 !== $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$[0] && ($context$jscomp$9_surfacePtr$$.canvas.width = $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$[0]);
  0 !== $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$[1] && ($context$jscomp$9_surfacePtr$$.canvas.height = $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$[1]);
  $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$ = {device:$WebGPU$getJsObject$$($HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 4 >>> 2 >>> 0]), format:$WebGPU$TextureFormat$$[$HEAP32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 8 >>> 2 >>> 0]], usage:$HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 16 >>> 2 >>> 0], alphaMode:$WebGPU$CompositeAlphaMode$$[$HEAP32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 40 >>> 2 >>> 0]]};
  var $viewFormatCount$jscomp$1$$ = $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 32 >>> 2 >>> 0];
  if ($viewFormatCount$jscomp$1$$) {
    var $viewFormatsPtr$jscomp$1$$ = $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 36 >>> 2 >>> 0];
    $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$.viewFormats = Array.from($HEAP32$$.subarray($viewFormatsPtr$jscomp$1$$ >>> 2 >>> 0, $viewFormatsPtr$jscomp$1$$ + 4 * $viewFormatCount$jscomp$1$$ >>> 2 >>> 0), $format$jscomp$30$$ => $WebGPU$TextureFormat$$[$format$jscomp$30$$]);
  }
  $config$jscomp$6_nextInChainPtr$jscomp$4$$ = $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ >>> 2 >>> 0];
  0 !== $config$jscomp$6_nextInChainPtr$jscomp$4$$ && ($assert$$(10 === $HEAP32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 4 >>> 2 >>> 0]), $assert$$(0 === $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ >>> 2 >>> 0]), $assert$$($config$jscomp$6_nextInChainPtr$jscomp$4$$), $assert$$(0 === $HEAPU32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ >>> 2 >>> 0]), $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$.colorSpace = $WebGPU$PredefinedColorSpace$$[$HEAP32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 
  8 >>> 2 >>> 0]], $canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$.$toneMapping$ = {mode:$WebGPU$ToneMappingMode$$[$HEAP32$$[$config$jscomp$6_nextInChainPtr$jscomp$4$$ + 12 >>> 2 >>> 0]]});
  $context$jscomp$9_surfacePtr$$.configure($canvasSize$jscomp$2_configuration$jscomp$5_presentMode$$);
}, wgpuSurfaceGetCurrentTexture:function($context$jscomp$10_surfacePtr$jscomp$1$$, $surfaceTexturePtr$$) {
  $context$jscomp$10_surfacePtr$jscomp$1$$ >>>= 0;
  $surfaceTexturePtr$$ >>>= 0;
  $assert$$($surfaceTexturePtr$$);
  $context$jscomp$10_surfacePtr$jscomp$1$$ = $WebGPU$getJsObject$$($context$jscomp$10_surfacePtr$jscomp$1$$);
  try {
    var $texturePtr$$ = $_emwgpuCreateTexture$$(0), $jsObject$jscomp$inline_380$$ = $context$jscomp$10_surfacePtr$jscomp$1$$.getCurrentTexture();
    $WebGPU$Internals$jsObjects$$[$texturePtr$$ >>> 0] = $jsObject$jscomp$inline_380$$;
    $HEAPU32$$[$surfaceTexturePtr$$ + 4 >>> 2 >>> 0] = $texturePtr$$;
    $HEAP32$$[$surfaceTexturePtr$$ + 8 >>> 2 >>> 0] = 1;
  } catch ($ex$jscomp$3$$) {
    $err$$(`wgpuSurfaceGetCurrentTexture() failed: ${$ex$jscomp$3$$}`), $HEAPU32$$[$surfaceTexturePtr$$ + 4 >>> 2 >>> 0] = 0, $HEAP32$$[$surfaceTexturePtr$$ + 8 >>> 2 >>> 0] = 6;
  }
}, wgpuSurfaceUnconfigure:function($surfacePtr$jscomp$2$$) {
  $WebGPU$getJsObject$$($surfacePtr$jscomp$2$$ >>> 0).unconfigure();
}, wgpuTextureCreateView:function($ptr$jscomp$62_texturePtr$jscomp$1$$, $descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$) {
  $ptr$jscomp$62_texturePtr$jscomp$1$$ >>>= 0;
  $descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ >>>= 0;
  if ($descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$) {
    var $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ = $HEAPU32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ >>> 2 >>> 0];
    if (0 !== $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$) {
      $assert$$(12 === $HEAP32$$[$desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ + 4 >>> 2 >>> 0]);
      $assert$$(0 === $HEAPU32$$[$desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ >>> 2 >>> 0]);
      $assert$$($desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$);
      $assert$$(0 === $HEAPU32$$[$desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ >>> 2 >>> 0]);
      var $swizzle_swizzlePtr$$ = $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ + 8;
      $swizzle_swizzlePtr$$ = `${$WebGPU$ComponentSwizzle$$[$HEAP32$$[$swizzle_swizzlePtr$$ >>> 2 >>> 0]] || "r"}${$WebGPU$ComponentSwizzle$$[$HEAP32$$[$swizzle_swizzlePtr$$ + 4 >>> 2 >>> 0]] || "g"}${$WebGPU$ComponentSwizzle$$[$HEAP32$$[$swizzle_swizzlePtr$$ + 8 >>> 2 >>> 0]] || "b"}${$WebGPU$ComponentSwizzle$$[$HEAP32$$[$swizzle_swizzlePtr$$ + 12 >>> 2 >>> 0]] || "a"}`;
    }
    $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ = $HEAPU32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 24 >>> 2 >>> 0];
    var $arrayLayerCount$$ = $HEAPU32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 32 >>> 2 >>> 0];
    $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ = {label:$WebGPU$makeStringFromOptionalStringView$$($descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 4), format:$WebGPU$TextureFormat$$[$HEAP32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 12 >>> 2 >>> 0]], dimension:$WebGPU$TextureViewDimension$$[$HEAP32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 16 >>> 2 >>> 0]], baseMipLevel:$HEAPU32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 
    20 >>> 2 >>> 0], mipLevelCount:4294967295 === $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$ ? void 0 : $desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$, baseArrayLayer:$HEAPU32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 28 >>> 2 >>> 0], arrayLayerCount:4294967295 === $arrayLayerCount$$ ? void 0 : $arrayLayerCount$$, aspect:$WebGPU$TextureAspect$$[$HEAP32$$[$descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ + 36 >>> 2 >>> 0]], swizzle:$swizzle_swizzlePtr$$};
  }
  $descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ = $WebGPU$getJsObject$$($ptr$jscomp$62_texturePtr$jscomp$1$$);
  $ptr$jscomp$62_texturePtr$jscomp$1$$ = $_emwgpuCreateTextureView$$(0);
  $descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$ = $descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$.createView($desc$jscomp$16_mipLevelCount_nextInChainPtr$jscomp$5$$);
  $WebGPU$Internals$jsObjects$$[$ptr$jscomp$62_texturePtr$jscomp$1$$ >>> 0] = $descriptor$jscomp$16_jsObject$jscomp$inline_383_texture$jscomp$11$$;
  return $ptr$jscomp$62_texturePtr$jscomp$1$$;
}, wgpuTextureDestroy:function($texturePtr$jscomp$2$$) {
  $WebGPU$getJsObject$$($texturePtr$jscomp$2$$ >>> 0).destroy();
}, wgpuTextureGetFormat:function($texture$jscomp$12_texturePtr$jscomp$3$$) {
  $texture$jscomp$12_texturePtr$jscomp$3$$ = $WebGPU$getJsObject$$($texture$jscomp$12_texturePtr$jscomp$3$$ >>> 0);
  return $WebGPU$TextureFormat$$.indexOf($texture$jscomp$12_texturePtr$jscomp$3$$.format);
}};
function $applySignatureConversions$$() {
  var $wasmExports$jscomp$2$$ = $wasmExports$$;
  $wasmExports$jscomp$2$$ = Object.assign({}, $wasmExports$jscomp$2$$);
  var $makeWrapper_pp$$ = $f$jscomp$3$$ => $a0$$ => $f$jscomp$3$$($a0$$) >>> 0, $makeWrapper_p$$ = $f$jscomp$5$$ => () => $f$jscomp$5$$() >>> 0;
  $wasmExports$jscomp$2$$.malloc = $makeWrapper_pp$$($wasmExports$jscomp$2$$.malloc);
  $wasmExports$jscomp$2$$.strerror = ($f$jscomp$4$$ => $a0$jscomp$1$$ => $f$jscomp$4$$($a0$jscomp$1$$) >>> 0)($wasmExports$jscomp$2$$.strerror);
  $wasmExports$jscomp$2$$.emscripten_stack_get_end = $makeWrapper_p$$($wasmExports$jscomp$2$$.emscripten_stack_get_end);
  $wasmExports$jscomp$2$$.emscripten_stack_get_base = $makeWrapper_p$$($wasmExports$jscomp$2$$.emscripten_stack_get_base);
  $wasmExports$jscomp$2$$.memalign = ($f$jscomp$6$$ => ($a0$jscomp$2$$, $a1$jscomp$16$$) => $f$jscomp$6$$($a0$jscomp$2$$, $a1$jscomp$16$$) >>> 0)($wasmExports$jscomp$2$$.memalign);
  $wasmExports$jscomp$2$$._emscripten_stack_alloc = $makeWrapper_pp$$($wasmExports$jscomp$2$$._emscripten_stack_alloc);
  $wasmExports$jscomp$2$$.emscripten_stack_get_current = $makeWrapper_p$$($wasmExports$jscomp$2$$.emscripten_stack_get_current);
  return $wasmExports$jscomp$2$$;
}
var $calledRun$$;
function $callMain$$($args$jscomp$124$$ = []) {
  $assert$$(0 == $runDependencies$$, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  $assert$$("undefined" === typeof $onPreRuns$$ || 0 == $onPreRuns$$.length, "cannot call main when preRun functions remain to be called");
  var $entryFunction$$ = $_main$$;
  $args$jscomp$124$$.unshift($thisProgram$$);
  var $argc$$ = $args$jscomp$124$$.length, $argv$$ = $__emscripten_stack_alloc$$(4 * ($argc$$ + 1)), $argv_ptr$$ = $argv$$;
  $args$jscomp$124$$.forEach($arg$jscomp$14$$ => {
    $HEAPU32$$[$argv_ptr$$ >>> 2 >>> 0] = $stringToUTF8OnStack$$($arg$jscomp$14$$);
    $argv_ptr$$ += 4;
  });
  $HEAPU32$$[$argv_ptr$$ >>> 2 >>> 0] = 0;
  try {
    var $ret$jscomp$20$$ = $entryFunction$$($argc$$, $argv$$);
    $exitJS$$($ret$jscomp$20$$, !0);
  } catch ($e$jscomp$66$$) {
    $handleException$$($e$jscomp$66$$);
  }
}
function $run$$($args$jscomp$125$$ = $arguments_$$) {
  function $doRun$$() {
    $assert$$(!$calledRun$$);
    $calledRun$$ = !0;
    $Module$$.calledRun = !0;
    if (!$ABORT$$) {
      $assert$$(!$runtimeInitialized$$);
      $runtimeInitialized$$ = !0;
      $checkStackCookie$$();
      if (!$Module$$.noFSInit && !$FS$initialized$$) {
        $assert$$(!$FS$initialized$$, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        $FS$initialized$$ = !0;
        $input$jscomp$inline_553_input$jscomp$inline_556_stdout$jscomp$inline_560$$ ??= $Module$$.stdin;
        $output$jscomp$inline_554_output$jscomp$inline_557_stderr$jscomp$inline_561$$ ??= $Module$$.stdout;
        $cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$ ??= $Module$$.stderr;
        $input$jscomp$inline_553_input$jscomp$inline_556_stdout$jscomp$inline_560$$ ? $FS$createDevice$$("/dev", "stdin", $input$jscomp$inline_553_input$jscomp$inline_556_stdout$jscomp$inline_560$$) : $FS$symlink$$("/dev/tty", "/dev/stdin");
        $output$jscomp$inline_554_output$jscomp$inline_557_stderr$jscomp$inline_561$$ ? $FS$createDevice$$("/dev", "stdout", null, $output$jscomp$inline_554_output$jscomp$inline_557_stderr$jscomp$inline_561$$) : $FS$symlink$$("/dev/tty", "/dev/stdout");
        $cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$ ? $FS$createDevice$$("/dev", "stderr", null, $cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$) : $FS$symlink$$("/dev/tty1", "/dev/stderr");
        var $cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$ = $FS$open$$("/dev/stdin", 0);
        var $input$jscomp$inline_553_input$jscomp$inline_556_stdout$jscomp$inline_560$$ = $FS$open$$("/dev/stdout", 1);
        var $output$jscomp$inline_554_output$jscomp$inline_557_stderr$jscomp$inline_561$$ = $FS$open$$("/dev/stderr", 1);
        $assert$$(0 === $cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$.fd, `invalid handle for stdin (${$cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$.fd})`);
        $assert$$(1 === $input$jscomp$inline_553_input$jscomp$inline_556_stdout$jscomp$inline_560$$.fd, `invalid handle for stdout (${$input$jscomp$inline_553_input$jscomp$inline_556_stdout$jscomp$inline_560$$.fd})`);
        $assert$$(2 === $output$jscomp$inline_554_output$jscomp$inline_557_stderr$jscomp$inline_561$$.fd, `invalid handle for stderr (${$output$jscomp$inline_554_output$jscomp$inline_557_stderr$jscomp$inline_561$$.fd})`);
      }
      $wasmExports$$.__wasm_call_ctors();
      $FS$ignorePermissions$$ = !1;
      $checkStackCookie$$();
      $Module$$.onRuntimeInitialized?.();
      $consumedModuleProp$$("onRuntimeInitialized");
      $Module$$.noInitialRun || $callMain$$($args$jscomp$125$$);
      $checkStackCookie$$();
      if ($Module$$.postRun) {
        for ("function" == typeof $Module$$.postRun && ($Module$$.postRun = [$Module$$.postRun]); $Module$$.postRun.length;) {
          $cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$ = $Module$$.postRun.shift(), $onPostRuns$$.push($cb$jscomp$inline_563_error$jscomp$inline_555_error$jscomp$inline_558_stdin$jscomp$inline_559$$);
        }
      }
      $consumedModuleProp$$("postRun");
      $callRuntimeCallbacks$$($onPostRuns$$);
    }
  }
  if (0 < $runDependencies$$) {
    $dependenciesFulfilled$$ = $run$$;
  } else {
    $_emscripten_stack_init$$();
    $writeStackCookie$$();
    if ($Module$$.preRun) {
      for ("function" == typeof $Module$$.preRun && ($Module$$.preRun = [$Module$$.preRun]); $Module$$.preRun.length;) {
        $addOnPreRun$$();
      }
    }
    $consumedModuleProp$$("preRun");
    $callRuntimeCallbacks$$($onPreRuns$$);
    0 < $runDependencies$$ ? $dependenciesFulfilled$$ = $run$$ : ($Module$$.setStatus ? ($Module$$.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => $Module$$.setStatus(""), 1);
      $doRun$$();
    }, 1)) : $doRun$$(), $checkStackCookie$$());
  }
}
function $checkUnflushedContent$$() {
  var $oldOut$$ = $out$$, $oldErr$$ = $err$$, $has$$ = !1;
  $out$$ = $err$$ = () => {
    $has$$ = !0;
  };
  try {
    $_fflush$$(0), ["stdout", "stderr"].forEach($name$jscomp$123_path$jscomp$inline_390$$ => {
      $name$jscomp$123_path$jscomp$inline_390$$ = "/dev/" + $name$jscomp$123_path$jscomp$inline_390$$;
      try {
        var $lookup$jscomp$inline_392$$ = $FS$lookupPath$$($name$jscomp$123_path$jscomp$inline_390$$, {$follow$:!0});
        $name$jscomp$123_path$jscomp$inline_390$$ = $lookup$jscomp$inline_392$$.path;
      } catch ($e$jscomp$inline_394$$) {
      }
      var $ret$jscomp$inline_393$$ = {$isRoot$:!1, exists:!1, error:0, name:null, path:null, object:null, $parentExists$:!1, $parentPath$:null, $parentObject$:null};
      try {
        $lookup$jscomp$inline_392$$ = $FS$lookupPath$$($name$jscomp$123_path$jscomp$inline_390$$, {parent:!0}), $ret$jscomp$inline_393$$.$parentExists$ = !0, $ret$jscomp$inline_393$$.$parentPath$ = $lookup$jscomp$inline_392$$.path, $ret$jscomp$inline_393$$.$parentObject$ = $lookup$jscomp$inline_392$$.node, $ret$jscomp$inline_393$$.name = $PATH$basename$$($name$jscomp$123_path$jscomp$inline_390$$), $lookup$jscomp$inline_392$$ = $FS$lookupPath$$($name$jscomp$123_path$jscomp$inline_390$$, {$follow$:!0}), 
        $ret$jscomp$inline_393$$.exists = !0, $ret$jscomp$inline_393$$.path = $lookup$jscomp$inline_392$$.path, $ret$jscomp$inline_393$$.object = $lookup$jscomp$inline_392$$.node, $ret$jscomp$inline_393$$.name = $lookup$jscomp$inline_392$$.node.name, $ret$jscomp$inline_393$$.$isRoot$ = "/" === $lookup$jscomp$inline_392$$.path;
      } catch ($e$jscomp$inline_395$$) {
        $ret$jscomp$inline_393$$.error = $e$jscomp$inline_395$$.$errno$;
      }
      $ret$jscomp$inline_393$$ && $TTY$ttys$$[$ret$jscomp$inline_393$$.object.rdev]?.output?.length && ($has$$ = !0);
    });
  } catch ($e$jscomp$67$$) {
  }
  $out$$ = $oldOut$$;
  $err$$ = $oldErr$$;
  $has$$ && $warnOnce$$("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.");
}
var $wasmExports$$;
(async function() {
  function $receiveInstance$$($instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$) {
    var $exports$jscomp$inline_397_wrapper$jscomp$inline_399$$ = $wasmExports$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$.exports;
    $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$ = {};
    for (let [$x$jscomp$inline_400$$, $original$jscomp$inline_401$$] of Object.entries($exports$jscomp$inline_397_wrapper$jscomp$inline_399$$)) {
      "function" == typeof $original$jscomp$inline_401$$ ? ($exports$jscomp$inline_397_wrapper$jscomp$inline_399$$ = $Asyncify$instrumentFunction$$($original$jscomp$inline_401$$), $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$[$x$jscomp$inline_400$$] = $exports$jscomp$inline_397_wrapper$jscomp$inline_399$$) : $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$[$x$jscomp$inline_400$$] = $original$jscomp$inline_401$$;
    }
    $wasmExports$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$;
    $wasmExports$$ = $applySignatureConversions$$();
    $wasmMemory$$ = $wasmExports$$.memory;
    $assert$$($wasmMemory$$, "memory not found in wasm exports");
    $updateMemoryViews$$();
    $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$ = $wasmExports$$;
    $Module$$._main = $_main$$ = $createExportWrapper$$("__main_argc_argv", 2);
    $_free$$ = $createExportWrapper$$("free", 1);
    $_malloc$$ = $createExportWrapper$$("malloc", 1);
    $_strerror$$ = $createExportWrapper$$("strerror", 1);
    $Module$$._SDL_free = $_SDL_free$$ = $createExportWrapper$$("SDL_free", 1);
    $Module$$._SDL_malloc = $_SDL_malloc$$ = $createExportWrapper$$("SDL_malloc", 1);
    $Module$$._SDL_calloc = $createExportWrapper$$("SDL_calloc", 2);
    $Module$$._SDL_realloc = $createExportWrapper$$("SDL_realloc", 2);
    $_fflush$$ = $createExportWrapper$$("fflush", 1);
    $Module$$._Emscripten_HandlePointerEnter = $_Emscripten_HandlePointerEnter$$ = $createExportWrapper$$("Emscripten_HandlePointerEnter", 2);
    $Module$$._Emscripten_HandlePointerLeave = $_Emscripten_HandlePointerLeave$$ = $createExportWrapper$$("Emscripten_HandlePointerLeave", 2);
    $Module$$._Emscripten_HandlePointerGeneric = $_Emscripten_HandlePointerGeneric$$ = $createExportWrapper$$("Emscripten_HandlePointerGeneric", 2);
    $Module$$._Emscripten_SendDragEvent = $_Emscripten_SendDragEvent$$ = $createExportWrapper$$("Emscripten_SendDragEvent", 2);
    $Module$$._Emscripten_SendDragCompleteEvent = $_Emscripten_SendDragCompleteEvent$$ = $createExportWrapper$$("Emscripten_SendDragCompleteEvent", 1);
    $Module$$._Emscripten_SendDragTextEvent = $_Emscripten_SendDragTextEvent$$ = $createExportWrapper$$("Emscripten_SendDragTextEvent", 2);
    $Module$$._Emscripten_SendDragFileEvent = $_Emscripten_SendDragFileEvent$$ = $createExportWrapper$$("Emscripten_SendDragFileEvent", 2);
    $Module$$._Emscripten_SendSystemThemeChangedEvent = $_Emscripten_SendSystemThemeChangedEvent$$ = $createExportWrapper$$("Emscripten_SendSystemThemeChangedEvent", 0);
    $Module$$._requestFullscreenThroughSDL = $_requestFullscreenThroughSDL$$ = $createExportWrapper$$("requestFullscreenThroughSDL", 1);
    $_emwgpuCreateBindGroup$$ = $createExportWrapper$$("emwgpuCreateBindGroup", 1);
    $_emwgpuCreateBindGroupLayout$$ = $createExportWrapper$$("emwgpuCreateBindGroupLayout", 1);
    $_emwgpuCreateCommandBuffer$$ = $createExportWrapper$$("emwgpuCreateCommandBuffer", 1);
    $_emwgpuCreateCommandEncoder$$ = $createExportWrapper$$("emwgpuCreateCommandEncoder", 1);
    $_emwgpuCreatePipelineLayout$$ = $createExportWrapper$$("emwgpuCreatePipelineLayout", 1);
    $_emwgpuCreateRenderPassEncoder$$ = $createExportWrapper$$("emwgpuCreateRenderPassEncoder", 1);
    $_emwgpuCreateRenderPipeline$$ = $createExportWrapper$$("emwgpuCreateRenderPipeline", 1);
    $_emwgpuCreateSurface$$ = $createExportWrapper$$("emwgpuCreateSurface", 1);
    $_emwgpuCreateTexture$$ = $createExportWrapper$$("emwgpuCreateTexture", 1);
    $_emwgpuCreateTextureView$$ = $createExportWrapper$$("emwgpuCreateTextureView", 1);
    $_emwgpuOnDeviceLostCompleted$$ = $createExportWrapper$$("emwgpuOnDeviceLostCompleted", 3);
    $_emwgpuOnRequestAdapterCompleted$$ = $createExportWrapper$$("emwgpuOnRequestAdapterCompleted", 4);
    $_emwgpuOnRequestDeviceCompleted$$ = $createExportWrapper$$("emwgpuOnRequestDeviceCompleted", 4);
    $_emwgpuOnUncapturedError$$ = $createExportWrapper$$("emwgpuOnUncapturedError", 3);
    $_emscripten_stack_get_end$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$.emscripten_stack_get_end;
    $_emscripten_stack_init$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$.emscripten_stack_init;
    $__emscripten_stack_restore$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$._emscripten_stack_restore;
    $__emscripten_stack_alloc$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$._emscripten_stack_alloc;
    $_emscripten_stack_get_current$$ = $instance$jscomp$1_ret$jscomp$inline_398_wasmExports$jscomp$inline_403$$.emscripten_stack_get_current;
    $dynCalls$$.ii = $createExportWrapper$$("dynCall_ii", 2);
    $dynCalls$$.vi = dynCall_vi = $createExportWrapper$$("dynCall_vi", 2);
    $dynCalls$$.vii = dynCall_vii = $createExportWrapper$$("dynCall_vii", 3);
    $dynCalls$$.iii = dynCall_iii = $createExportWrapper$$("dynCall_iii", 3);
    $dynCalls$$.viiiii = $createExportWrapper$$("dynCall_viiiii", 6);
    $dynCalls$$.viiii = $createExportWrapper$$("dynCall_viiii", 5);
    $dynCalls$$.iiii = $dynCall_iiii$$ = $createExportWrapper$$("dynCall_iiii", 4);
    $dynCalls$$.iiiii = $createExportWrapper$$("dynCall_iiiii", 5);
    $dynCalls$$.viii = $createExportWrapper$$("dynCall_viii", 4);
    $dynCalls$$.v = dynCall_v = $createExportWrapper$$("dynCall_v", 1);
    $dynCalls$$.viiifi = $createExportWrapper$$("dynCall_viiifi", 6);
    $dynCalls$$.jiji = $createExportWrapper$$("dynCall_jiji", 4);
    $dynCalls$$.iiiiii = $createExportWrapper$$("dynCall_iiiiii", 6);
    $dynCalls$$.viiiiii = $createExportWrapper$$("dynCall_viiiiii", 7);
    $dynCalls$$.i = $createExportWrapper$$("dynCall_i", 1);
    $dynCalls$$.viji = $createExportWrapper$$("dynCall_viji", 4);
    $dynCalls$$.vffff = $createExportWrapper$$("dynCall_vffff", 5);
    $dynCalls$$.vf = $createExportWrapper$$("dynCall_vf", 2);
    $dynCalls$$.viiiiiiii = $createExportWrapper$$("dynCall_viiiiiiii", 9);
    $dynCalls$$.viiiiiiiii = $createExportWrapper$$("dynCall_viiiiiiiii", 10);
    $dynCalls$$.vff = $createExportWrapper$$("dynCall_vff", 3);
    $dynCalls$$.viiiiiii = $createExportWrapper$$("dynCall_viiiiiii", 8);
    $dynCalls$$.vfi = $createExportWrapper$$("dynCall_vfi", 3);
    $dynCalls$$.viif = $createExportWrapper$$("dynCall_viif", 4);
    $dynCalls$$.vif = $createExportWrapper$$("dynCall_vif", 3);
    $dynCalls$$.viff = $createExportWrapper$$("dynCall_viff", 4);
    $dynCalls$$.vifff = $createExportWrapper$$("dynCall_vifff", 5);
    $dynCalls$$.viffff = $createExportWrapper$$("dynCall_viffff", 6);
    $dynCalls$$.vfff = $createExportWrapper$$("dynCall_vfff", 4);
    $dynCalls$$.iidiiii = $createExportWrapper$$("dynCall_iidiiii", 7);
    $dynCalls$$.viijii = $createExportWrapper$$("dynCall_viijii", 6);
    $dynCalls$$.iiiiiiiii = $createExportWrapper$$("dynCall_iiiiiiiii", 9);
    $dynCalls$$.iiiiiii = $createExportWrapper$$("dynCall_iiiiiii", 7);
    $dynCalls$$.iiiiij = $createExportWrapper$$("dynCall_iiiiij", 6);
    $dynCalls$$.iiiiid = $createExportWrapper$$("dynCall_iiiiid", 6);
    $dynCalls$$.iiiiijj = $createExportWrapper$$("dynCall_iiiiijj", 7);
    $dynCalls$$.iiiiiiii = $createExportWrapper$$("dynCall_iiiiiiii", 8);
    $dynCalls$$.iiiiiijj = $createExportWrapper$$("dynCall_iiiiiijj", 8);
    $_asyncify_start_unwind$$ = $createExportWrapper$$("asyncify_start_unwind", 1);
    $_asyncify_stop_unwind$$ = $createExportWrapper$$("asyncify_stop_unwind", 0);
    $_asyncify_start_rewind$$ = $createExportWrapper$$("asyncify_start_rewind", 1);
    $_asyncify_stop_rewind$$ = $createExportWrapper$$("asyncify_stop_rewind", 0);
    $removeRunDependency$$("wasm-instantiate");
    return $wasmExports$$;
  }
  $addRunDependency$$("wasm-instantiate");
  var $trueModule$$ = $Module$$;
  $Asyncify$instrumentWasmImports$$();
  var $info$$ = {env:$wasmImports$$, wasi_snapshot_preview1:$wasmImports$$};
  if ($Module$$.instantiateWasm) {
    return new Promise(($resolve$jscomp$1$$, $reject$jscomp$1$$) => {
      try {
        $Module$$.instantiateWasm($info$$, ($mod$$, $inst$$) => {
          $resolve$jscomp$1$$($receiveInstance$$($mod$$, $inst$$));
        });
      } catch ($e$jscomp$8$$) {
        $err$$(`Module.instantiateWasm callback failed with error: ${$e$jscomp$8$$}`), $reject$jscomp$1$$($e$jscomp$8$$);
      }
    });
  }
  $wasmBinaryFile$$ ??= $Module$$.locateFile ? $Module$$.locateFile("testapp.wasm", $scriptDirectory$$) : $scriptDirectory$$ + "testapp.wasm";
  return function($result$jscomp$2$$) {
    $assert$$($Module$$ === $trueModule$$, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    $trueModule$$ = null;
    return $receiveInstance$$($result$jscomp$2$$.instance);
  }(await $instantiateAsync$$($info$$));
})();
$run$$();

