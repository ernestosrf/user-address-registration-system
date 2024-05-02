// package br.com.projeto.api.security;

// import java.util.Collection;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// public class UserPrincipal implements UserDetails {
//     private String id;
//     private String username;
//     private String password;
//     private String acessToken;

//     public UserPrincipal(String id, String username, String password, String acessToken) {
//         this.id = id;
//         this.username = username;
//         this.password = password;
//         this.acessToken = acessToken;
//     }

//     @Override
//     public String getPassword() {
//         return password;
//     }

//     @Override
//     public String getUsername() {
//         return username;
//     }

//     public String getId() {
//         return id;
//     }

//     public String getAcessToken() {
//         return acessToken;
//     }

//     @Override
//     public boolean isAccountNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isAccountNonLocked() {
//         return true;
//     }

//     @Override
//     public boolean isCredentialsNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isEnabled() {
//         return true;
//     }

//     @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         // TODO Auto-generated method stub
//         throw new UnsupportedOperationException("Unimplemented method 'getAuthorities'");
//     }
    
// }
