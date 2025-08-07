import FirebaseAuthService from '@/services/firebaseAuthService';
import { Usuario, FuncaoUsuario, PermissoesUsuario } from '@/types/usuario';
import { auth } from '@/lib/firebase';

export const migrateUsersToRealtime = async () => {
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

  console.log('🚀 Migrando usuários para Realtime Database...');

  for (const user of users) {
    try {
      // Verificar se o usuário já existe no Realtime Database
      const existingUser = await FirebaseAuthService.getUserByEmail(user.email);
      
      if (existingUser) {
        console.log(`✅ Usuário ${user.email} já existe no Realtime Database`);
        continue;
      }

      // Verificar se o usuário existe no Firebase Auth
      const authUser = auth.currentUser;
      if (authUser && authUser.email === user.email) {
        // Usuário está logado, criar dados no Realtime Database
        const result = await FirebaseAuthService.createUser(
          user.email,
          user.password,
          user.userData
        );

        if (result.success) {
          console.log(`✅ Usuário ${user.email} migrado com sucesso`);
        } else {
          console.error(`❌ Erro ao migrar usuário ${user.email}:`, result.error);
        }
      } else {
        // Criar usuário completo
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
      }
    } catch (error) {
      console.error(`❌ Erro ao processar usuário ${user.email}:`, error);
    }
  }

  console.log('🎉 Processo de migração concluído!');
};

export default migrateUsersToRealtime; 