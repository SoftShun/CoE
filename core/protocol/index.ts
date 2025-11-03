import {
  ToCoreFromWebviewProtocol,
  ToWebviewFromCoreProtocol,
} from "./coreWebview";
import { ToCoreFromIdeOrWebviewProtocol } from "./core";
import { ToWebviewOrCoreFromIdeProtocol } from "./ide";
import { ToCoreFromIdeProtocol, ToIdeFromCoreProtocol } from "./ideCore";
import {
  ToIdeFromWebviewProtocol,
  ToWebviewFromIdeProtocol,
} from "./ideWebview";

export type IProtocol = Record<string, [any, any]>;

// IDE
export type ToIdeProtocol = ToIdeFromWebviewProtocol & ToIdeFromCoreProtocol;
export type FromIdeProtocol = ToWebviewFromIdeProtocol &
  ToCoreFromIdeProtocol &
  ToWebviewOrCoreFromIdeProtocol;

// Webview
export type ToWebviewProtocol = ToWebviewFromIdeProtocol &
  ToWebviewFromCoreProtocol &
  ToWebviewOrCoreFromIdeProtocol;
export type FromWebviewProtocol = ToIdeFromWebviewProtocol &
  ToCoreFromWebviewProtocol;

// Core
export type ToCoreProtocol = ToCoreFromIdeProtocol &
  ToCoreFromWebviewProtocol &
  ToCoreFromIdeOrWebviewProtocol &
  ToWebviewOrCoreFromIdeProtocol;
export type FromCoreProtocol = ToWebviewFromCoreProtocol &
  ToIdeFromCoreProtocol;
