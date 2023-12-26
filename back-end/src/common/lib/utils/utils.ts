import fs from 'fs';
import path from 'path';
import { Injectable, Logger } from '@nestjs/common';

export function validFileName(value: string) {
  return value.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

export function convertStringToDate(dateString: string): Date | null {
  const dateParts = dateString.split('/');
  if (dateParts.length === 3) {
    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Verifica se i valori sono validi
    if (
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= 31 &&
      year >= 1000 &&
      year <= 9999
    ) {
      const dateNew = new Date(year, month - 1, day);
      Logger.debug(` ${dateNew}`);

      return dateNew;
    }
  }

  // Se la stringa non è nel formato corretto o i valori non sono validi, restituisci null
  return null;
}

export function deleteAllFilesInDirSync(dirPath: string) {
  try {
    const files = fs.readdirSync(dirPath);

    files.map((file) => fs.unlinkSync(path.join(dirPath, file)));
  } catch (err) {
    console.error(err);
  }
}

export function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}
