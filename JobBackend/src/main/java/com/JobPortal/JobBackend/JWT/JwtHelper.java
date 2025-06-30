package com.JobPortal.JobBackend.JWT;


import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


@Component
public class JwtHelper {


    @Value("${jwt.secret.key}")
    private String SECRET;

   private Key secretKey;

    private static final long JWT_TOKEN_VALIDITY = 60 * 60 * 1000;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());
    }


    // Generate token using username (or userId/email/etc.)
    public String generateToken(UserDetails userDetails) {
        Map<String,Object> claims = new HashMap<>();
        CustomUserDetails customUserDetails = (CustomUserDetails)userDetails;
        claims.put("id",customUserDetails.getId());
        claims.put("name",customUserDetails.getName());
        claims.put("profileId",customUserDetails.getProfileId());
        claims.put("accountType",customUserDetails.getAccountType());
        return doGenerateToken(claims,userDetails.getUsername());
    }

    // Extract username from token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Extract a specific claim using a resolver
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
       final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // Check if token is valid
    public boolean validateToken(String token, String username) {
        final String tokenUsername = getUsernameFromToken(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    // Check if token is expired
    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // Extract expiration date
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    // Extract all claims
    private Claims getAllClaimsFromToken(String token) {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }
        private String doGenerateToken(Map<String,Object> claims, String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(secretKey)
                .compact();
    }
}

