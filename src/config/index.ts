import dotenv, { DotenvConfigOutput } from 'dotenv';

// Set .env file as mandatory
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound: DotenvConfigOutput = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Export the Configuration along with default values where mandatory

const environmentVariablesList = ['API_PREFIX', 'PORT'];

environmentVariablesList.forEach((variable): void => {
  if (!process.env[variable]) {
    throw new Error(
      `⚠️  Couldn't find environment variable ${variable}, Please make sure that it is listed in .env  ⚠️`,
    );
  }
});

export default {
  gae: {
    api: {
      prefix: process.env.GAE_API_PREFIX || '/api/v1',
    },
  },
};
