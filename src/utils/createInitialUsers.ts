import FirebaseAuthService from '@/services/firebaseAuthService';
import { Usuario, FuncaoUsuario, PermissoesUsuario } from '@/types/usuario';

export const createInitialUsers = async () => {
  const users = [
    {
      email: 'admin@sa-telecom.com',
      password: 'admin123',
      userData: {
        nome: 'Administrador',
        sobrenome: 'Sistema',
        email: 'admin@sa-telecom.com',
        telefone: '(11) 99999-9999',
        funcao: FuncaoUsuario.ADMINISTRADOR,
        permissoes: {
          visualizarDashboard: true,
          gerenciarUsuarios: true,
          gerenciarEquipes: true,
          cadastrarVendas: true,
          visualizarVendas: true,
          editarVendas: true,
          excluirVendas: true,
          gerenciarConfiguracoes: true
        } as PermissoesUsuario,
        ativo: true,
        dataCriacao: new Date().toISOString()
      }
    },
    {
      email: 'gerente@sa-telecom.com',
      password: 'gerente123',
      userData: {
        nome: 'Gerente',
        sobrenome: 'Vendas',
        email: 'gerente@sa-telecom.com',
        telefone: '(11) 88888-8888',
        funcao: FuncaoUsuario.GERENTE,
        permissoes: {
          visualizarDashboard: true,
          gerenciarUsuarios: false,
          gerenciarEquipes: true,
          cadastrarVendas: true,
          visualizarVendas: true,
          editarVendas: true,
          excluirVendas: false,
          gerenciarConfiguracoes: false
        } as PermissoesUsuario,
        ativo: true,
        dataCriacao: new Date().toISOString()
      }
    },
    {
      email: 'vendedor@sa-telecom.com',
      password: 'vendedor123',
      userData: {
        nome: 'Vendedor',
        sobrenome: 'Exemplo',
        email: 'vendedor@sa-telecom.com',
        telefone: '(11) 77777-7777',
        funcao: FuncaoUsuario.VENDEDOR,
        permissoes: {
          visualizarDashboard: true,
          gerenciarUsuarios: false,
          gerenciarEquipes: false,
          cadastrarVendas: true,
          visualizarVendas: true,
          editarVendas: false,
          excluirVendas: false,
          gerenciarConfiguracoes: false
        } as PermissoesUsuario,
        ativo: true,
        dataCriacao: new Date().toISOString()
      }
    }
  ];

  console.log('🚀 Criando usuários iniciais...');

  for (const user of users) {
    try {
      // Verificar se o usuário já existe
      const existingUser = await FirebaseAuthService.getUserByEmail(user.email);
      
      if (existingUser) {
        console.log(`✅ Usuário ${user.email} já existe`);
        continue;
      }

      const result = await FirebaseAuthService.createUser(
        user.email,
        user.password,
        user.userData
      );

      if (result.success) {
        console.log(`✅ Usuário ${user.email} criado com sucesso`);
      } else {
        console.error(`❌ Erro ao criar usuário ${user.email}:`, result.error);
      }
    } catch (error) {
      console.error(`❌ Erro ao criar usuário ${user.email}:`, error);
    }
  }

  console.log('🎉 Processo de criação de usuários concluído!');
};

export default createInitialUsers; 