import RNFS from 'react-native-fs';

const dbPath = `${RNFS.DocumentDirectoryPath}/expenses.db`;
const backupPath = `${RNFS.ExternalDirectoryPath}/expenses_backup.db`;

export const restoreDatabase = async (): Promise<void> => {
  try {
    await RNFS.copyFile(backupPath, dbPath);
    console.log('Restore successful');
  } catch (err) {
    console.error('Restore failed', err);
  }
};