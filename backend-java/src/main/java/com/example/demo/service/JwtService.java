package com.example.demo.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    // Best practice: load from application properties / env, not hardcoded
    private final byte[] secretBytes;

    // Stage 1: short-lived access token
    private final long accessTokenTtlSeconds;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-ttl-seconds:600}") long accessTokenTtlSeconds
    ) {
        // HS256 requires a sufficiently long secret; 32+ bytes recommended
        this.secretBytes = secret.getBytes(StandardCharsets.UTF_8);
        this.accessTokenTtlSeconds = accessTokenTtlSeconds;
    }

    public String generateAccessToken(String email, String role) {
        try {
            Instant now = Instant.now();
            Instant exp = now.plusSeconds(accessTokenTtlSeconds);

            JWTClaimsSet claims = new JWTClaimsSet.Builder()
                    .subject(email)
                    .claim("role", role)
                    .issueTime(Date.from(now))
                    .expirationTime(Date.from(exp))
                    .build();

            SignedJWT jwt = new SignedJWT(
                    new JWSHeader(JWSAlgorithm.HS256),
                    claims
            );

            JWSSigner signer = new MACSigner(secretBytes);
            jwt.sign(signer);

            return jwt.serialize();
        } catch (JOSEException e) {
            // In real apps you may wrap into a domain exception
            throw new IllegalStateException("Failed to sign JWT", e);
        }
    }

    // Helper for NimbusJwtDecoder configuration (same secret, HS256)
    public SecretKey getHmacSecretKey() {
        return new SecretKeySpec(secretBytes, "HmacSHA256");
    }
}




//package com.example.demo.service;
//import com.nimbusds.jose.JWSAlgorithm;
//import com.nimbusds.jose.JWSHeader;
//import com.nimbusds.jose.JWSSigner;
//import com.nimbusds.jose.crypto.MACSigner;
//import com.nimbusds.jwt.JWTClaimsSet;
//import com.nimbusds.jwt.SignedJWT;
//import org.springframework.stereotype.Service;
//import io.jsonwebtoken.*;
//import io.jsonwebtoken.security.Keys;
//import java.util.*;
//@Service
//public class JwtService {
// private static final String SECRET="replace-with-long-secret-at-least-32-bytes";
// private static final long EXP=1000*60*10;
// public String generateToken(String email,String role){
//   Date now=new Date();
//   Date exp=new Date(now.getTime()+EXP);
//   return Jwts.builder()
//     .subject(email)
//     .claim("role", role)
//     .issuedAt(now)
//     .expiration(exp)
//     .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), Jwts.SIG.HS256)
//     .compact();
//     JWSSigner signer = new MACSigner(secretKey);
//
//     JWTClaimsSet claims = new JWTClaimsSet.Builder()
//             .subject(email)
//             .claim("role", role)
//             .issueTime(new Date())
//             .expirationTime(new Date(System.currentTimeMillis() + 600_000))
//             .build();
//
//     SignedJWT jwt = new SignedJWT(
//             new JWSHeader(JWSAlgorithm.HS256),
//             claims
//     );
//
//     jwt.sign(signer);
//     String token = jwt.serialize();
//
//
//
// }
// public static String getSecret(){return SECRET;}
//}
