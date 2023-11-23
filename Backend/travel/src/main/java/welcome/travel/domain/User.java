package welcome.travel.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
@Table
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
    private Boolean agreeMarketing;
    private Boolean agreeInfo;
    private Integer loginType;


    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

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

    public void updateKakao(String phoneNumber, Boolean agreeInfo, Boolean agreeMarketing) {
        this.phoneNumber = phoneNumber;
        this.agreeInfo = agreeInfo;
        this.agreeMarketing = agreeMarketing;
    }


}
