# Security Policy

## Supported Versions

This microfrontend demo uses the following framework versions with security patches:

| Framework | Version | Security Status |
| --------- | ------- | --------------- |
| React     | 18.2.0  | ✅ Secure       |
| Angular   | 19.2.18 | ✅ Patched      |
| Vite      | 5.1.0   | ✅ Secure       |

## Security Updates (January 2025)

### Angular Security Patches Applied

The Angular playground has been updated from version 17.1.0 to **19.2.18** to address the following critical vulnerabilities:

#### 1. XSRF Token Leakage via Protocol-Relative URLs
- **CVE**: Angular HTTP Client vulnerability
- **Affected Versions**: < 19.2.16
- **Severity**: High
- **Fixed In**: 19.2.16+
- **Impact**: XSRF tokens could leak when using protocol-relative URLs
- **Mitigation**: Updated to Angular 19.2.18

#### 2. XSS Vulnerability via Unsanitized SVG Script Attributes
- **CVE**: Multiple Angular components
- **Affected Versions**: <= 18.2.14
- **Severity**: High
- **Fixed In**: 19.2.18
- **Impact**: XSS attacks possible through unsanitized SVG script attributes
- **Mitigation**: Updated to Angular 19.2.18

#### 3. Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attributes
- **CVE**: Angular compiler and core
- **Affected Versions**: < 19.2.17
- **Severity**: High
- **Fixed In**: 19.2.17+
- **Impact**: Stored XSS attacks via SVG animations and MathML attributes
- **Mitigation**: Updated to Angular 19.2.18

## Reporting a Vulnerability

This is a demonstration project. For security issues in production applications:

1. **Angular**: Report to https://github.com/angular/angular/security
2. **React**: Report to https://github.com/facebook/react/security
3. **Vite**: Report to https://github.com/vitejs/vite/security

## Security Best Practices for Production

If you're using this demo as a reference for production applications:

### 1. Authentication & Authorization
- ❌ Don't use `localStorage` for tokens (demo only)
- ✅ Use HTTP-only cookies or secure session storage
- ✅ Implement proper JWT validation
- ✅ Use OAuth 2.0 or OpenID Connect for production

### 2. Content Security Policy (CSP)
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  connect-src 'self' http://localhost:3001 http://localhost:3002 http://localhost:3003;
  style-src 'self' 'unsafe-inline';
```

### 3. CORS Configuration
```javascript
// Example: Restrict CORS in production
app.use(cors({
  origin: ['https://your-production-domain.com'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 4. Module Federation Security
- ✅ Use HTTPS for all remote module URLs
- ✅ Implement integrity checks for remote modules
- ✅ Validate remote module sources
- ✅ Use subresource integrity (SRI) when possible

### 5. Input Validation
- ✅ Sanitize all user inputs
- ✅ Validate data at boundaries
- ✅ Use Angular's DomSanitizer for dynamic content
- ✅ Escape HTML in React components

### 6. Dependency Management
- ✅ Regularly update dependencies
- ✅ Use `npm audit` or `yarn audit`
- ✅ Monitor security advisories
- ✅ Use tools like Dependabot or Snyk

### 7. HTTPS Everywhere
- ✅ Serve all applications over HTTPS
- ✅ Use HSTS headers
- ✅ Redirect HTTP to HTTPS
- ✅ Use secure cookies (Secure and SameSite flags)

### 8. Error Handling
- ❌ Don't expose stack traces in production
- ✅ Log errors securely server-side
- ✅ Show generic error messages to users
- ✅ Implement proper error boundaries

## Security Checklist for Production

- [ ] All dependencies updated to latest secure versions
- [ ] CSP headers configured
- [ ] CORS properly restricted
- [ ] HTTPS enabled on all endpoints
- [ ] Authentication using secure methods (not localStorage)
- [ ] Input validation on all user inputs
- [ ] Error handling doesn't expose sensitive info
- [ ] Security headers configured (X-Frame-Options, X-Content-Type-Options, etc.)
- [ ] Rate limiting implemented
- [ ] Logging and monitoring in place
- [ ] Regular security audits scheduled
- [ ] Dependency scanning automated

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.dev/best-practices/security)
- [React Security](https://react.dev/learn/escape-hatches#security)
- [Module Federation Security](https://module-federation.io/security/)
- [Vite Security](https://vitejs.dev/guide/features.html#security)

## Disclaimer

This is a **demonstration project** for educational purposes. The security measures implemented here are simplified for learning. **Do not use this code as-is in production** without implementing proper security hardening, authentication, authorization, and following security best practices for your specific use case.

---

**Last Updated**: January 2025  
**Security Audit**: Dependencies checked and updated for known vulnerabilities
