const fs = require('fs');
const path = require('path');
// Change data to whatever you need it to be.
// const data = require('./data/rathkeale2023.json');

const renameFiles = async (directory) => {
    try {
        const directoryPath = directory;
        const files = fs.readdirSync(directoryPath);
        files.forEach(file => {
            let stripFileName = file.slice(4, 8);
                stripFileName = stripFileName.charAt(0) === '0' ? stripFileName.substring(1) : stripFileName;
            let findFromJSON = data.find(obj => obj['photoNumber'] === Number(stripFileName));
                if(findFromJSON){
                    let idNumber = findFromJSON.id;
                    let newFile = `${idNumber}.jpg`;
    
                    let oldPath = path.join(directory, file);
                    let newPath = path.join(directory, newFile);
    
                    fs.renameSync(oldPath, newPath, (err) => {
                        if (err) {
                            console.error(`Error renaming file, ${err}`);
                            return;
                        }
                        console.log(`Renamed ${file} to ${newFile}`);
                    });
                } else {
                    console.log(`No match found for file: ${file}`);
                }
            });
    } catch(err) {
        throw new Error (`Something went wrong: ${err}`);
    }
};

const renameFilesAPI = async (req, res) => {
    const { directory } = req.body;
    try {
        await renameFiles(directory);
        res.status(200).send('Files renamed successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error: ${err.message}`);
    }
};

module.exports = {
    renameFiles,
    renameFilesAPI
}