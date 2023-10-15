package welcome.travel.domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {


    @Id
    @GeneratedValue
    private Long id;

//    @Column(name = "user_name")
    private String email;
    private String password;
    private String nickname;
    private String image;
    private String phoneNumber;
    private Boolean agree_marketing;
    private Boolean agree_info;
    private Integer login_type;



    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    //==연관관계 편의 메서드==//

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    //==회원 정보 수정==//
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updatePassword(PasswordEncoder passwordEncoder, String password) {
        this.password = passwordEncoder.encode(password);
    }

    public void updateKakao(String phoneNumber, Boolean agree_info, Boolean agree_marketing) {
        this.phoneNumber = phoneNumber;
        this.agree_info = agree_info;
        this.agree_marketing = agree_marketing;
    }


}
