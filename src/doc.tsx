/**
 * @module react-observer-hook
 * @requires prop-types
 * @requires react
 * @requires react-dom
 * @summary Provides react hooks for the DOM observer APIs that facilitate detecting visibility and resizing of DOM elements.
 * @version 1.0.0
 * @author zemnmez
 * @copyright zemnmez 2019
 * @license MIT
 * ## Installation
 * 
 * ```bash
 * yarn add react-observer-hook
 * ```
 * 
 * ## Example
 * @example
 * 
 * ```javascript
 * import React from 'react'
 * import { useStorage } from 'react-storage-hook'
 * 
 * export const SavedTextarea = () => {
 *   const [text, setText] = useStorage('saved-text', {
 *     placeholder: ""
 *   });
 * 
 *   const onChange = e => setText(e.target.value);
 * 
 *   return <textarea {...{
 *     onChange,
 *     value: text
 *   }}/>
 * }
 * ```
 * 
 */

/**
 *  
 */


