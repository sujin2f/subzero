/**
 * Environment settings helpers
 */

import path from 'path'

/**
 * Get if the current server is development server
 * @return {boolean}
 */
export const isDev = (): boolean => process.env.NODE_ENV === 'development'
export const rootDir = path.resolve(__dirname, '../../')
export const publicDir = path.resolve(rootDir, 'public')
export const baseDirDev = path.resolve(rootDir, 'dist')
export const baseDirProd = path.resolve(rootDir, 'build')
/**
 * Get the bundle folder
 * @return {string[]}
 */
export const bundles = (): string[] => {
    const manifest = isDev()
        ? path.resolve(baseDirDev, 'asset-manifest.json')
        : path.resolve(baseDirProd, 'client', 'asset-manifest.json')
    const rawData = require(manifest)
    return rawData.entrypoints
}
