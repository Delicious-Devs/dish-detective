declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production'
      SPOONACULAR_API_KEY: string
    }
  }
}

export {}
