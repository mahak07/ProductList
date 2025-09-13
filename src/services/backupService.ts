import RNFS from 'react-native-fs';

const dbPath = `${RNFS.DocumentDirectoryPath}/expenses.db`;
const backupPath = `${RNFS.ExternalDirectoryPath}/expenses_backup.db`;

export const backupDatabase = async (): Promise<void> => {
  try {
    await RNFS.copyFile(dbPath, backupPath);
    console.log('Backup successful');
  } catch (err) {
    console.error('Backup failed', err);
  }
};