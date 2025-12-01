// jest.setup.js

// CRÍTICO: Garante que os objetos globais essenciais existam antes que o jest-expo
// tente modificá-los (resolvendo o TypeError: Object.defineProperty called on non-object)
if (typeof window !== 'object') {
    global.window = global;
}
if (typeof navigator !== 'object') {
    global.navigator = { userAgent: 'node.js' };
}
if (typeof document === 'undefined') {
    global.document = {};
}

// Mocks para React Navigation (já que ele causa falha no Jest)
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    NavigationContainer: ({ children }) => children,
    useRoute: () => ({ params: {} }),
    useFocusEffect: jest.fn(),
  };
});

jest.mock('@react-navigation/stack', () => ({
    createStackNavigator: () => ({
        Navigator: ({ children }) => children,
        Screen: ({ children }) => children,
    }),
}));

// Mock para componentes nativos que quebram no ambiente Jest (como Animated)
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock para o gerador de ID no seu Model, garantindo IDs estáveis nos testes
jest.mock('../src/models/Task', () => {
    const actual = jest.requireActual('../src/models/Task');
    return {
        ...actual,
        // Garante que os IDs gerados sejam previsíveis nos testes se necessário
        createTask: (title, description, completed = false) => ({
            id: 'mock-id-' + Math.random().toString(36).substring(7),
            title,
            description,
            completed,
        }),
    };
});