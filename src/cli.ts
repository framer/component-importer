import * as fse from "fs-extra"
import glob from "glob"
import path from "path"
import { processFile, processProgram } from "./process"

async function main() {
    if (!process.argv[2]) {
        console.log("")
        console.log("Usage:")
        console.log("yarn cli [src-dir] [out-dir]")
        console.log("")
        console.log("Example:")
        console.log("yarn cli ../my-project/src ../my-project/framer")
        console.log("")
        return
    }
    const srcDir = process.argv[2]
    const outDir = process.argv[3]
    const pattern = "**/*.{tsx,ts,js,jsx}"
    console.log({ pattern, outDir })
    const relativeFiles = await new Promise<string[]>(resolve =>
        glob(pattern, { cwd: srcDir }, (err, files) => resolve(files)),
    )
    console.log(relativeFiles)
    const processedFiles = await processProgram(srcDir, relativeFiles)
    for (const file of processedFiles) {
        const { relativeFile, generatedCode } = file
        console.log("Processing", relativeFile)
        // const srcFile = path.join(srcDir, relativeFile)
        // const code = await processFile(srcFile)
        if (!generatedCode) {
            console.log("Skipping", relativeFile)
            continue
        }
        if (!outDir) {
            console.log(generatedCode)
            continue
        }
        const outFile = path.join(outDir, relativeFile)
        console.log("Saving", outFile)
        await fse.ensureDir(path.dirname(outFile))
        await fse.writeFile(outFile, generatedCode)
    }
}
main()