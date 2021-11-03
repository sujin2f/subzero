/**
 * Environment settings helpers
 */

import path from 'path'
import fs from 'fs'

/**
 * Get if the current server is development server
 * @return {boolean}
 */
export const isDev = (): boolean => process.env.NODE_ENV === 'development'
export const rootDir = path.resolve(__dirname, '../../')
export const publicDir = path.resolve(rootDir, 'public')
export const baseDirDev = path.resolve(rootDir, 'dist')
export const baseDirProd = path.resolve(rootDir, 'build', 'frontend')
/**
 * Get the bundle folder
 * @return {string[]}
 */
export const bundles = (): string[] => {
    const dir = path.resolve(baseDirDev, 'static', 'js')
    return fs.readdirSync(dir).filter((file: string) => !file.endsWith('.map'))
}
