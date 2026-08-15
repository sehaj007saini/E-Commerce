# GitHub Push Checklist ✅

Before pushing your e-commerce project to GitHub, complete these steps:

## ✅ Security Checks (CRITICAL)

- [x] ✅ Database password removed from `application.properties`
- [x] ✅ Environment variables used instead (`${DB_PASSWORD}`)
- [x] ✅ `.env` file created with actual credentials
- [x] ✅ `.env` added to `.gitignore`
- [x] ✅ `.env.example` provided for reference
- [ ] ⚠️ Review all files for any other sensitive data (API keys, secrets)

## 📁 Files to Review Before Pushing

### Should NOT be pushed (verify .gitignore):
- ❌ `.env` (actual credentials)
- ❌ `node_modules/` (frontend dependencies)
- ❌ `target/` (backend build files)
- ❌ `.idea/` or `.vscode/` (IDE settings)
- ❌ Database dumps with real data
- ❌ Any files with passwords/API keys

### Should be pushed:
- ✅ `.env.example` (template with placeholders)
- ✅ `README.md`
- ✅ `.gitignore`
- ✅ All source code files
- ✅ `package.json` and `pom.xml`
- ✅ Documentation files

## 🔍 Pre-Push Commands

Run these to verify security:

```bash
# Check for passwords in tracked files
git grep -i "password" -- . ':!*.md' ':!.env.example'

# Check for database credentials
git grep -i "laknight07\|postgres.*=" -- . ':!*.md'

# List all files that will be committed
git status

# Review changes before committing
git diff
```

## 📝 Git Commands to Push

### 1. Initialize Git Repository

```bash
# Go to project root
cd F:/SummerProject

# Initialize git
git init

# Add all files
git add .

# Check what will be committed
git status

# Make first commit
git commit -m "Initial commit: E-commerce platform with Spring Boot & React"
```

### 2. Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name: `ecommerce-spring-react` (or your choice)
4. Description: "Full-stack e-commerce platform with Spring Boot backend and React frontend"
5. **Keep it Private** if it contains sensitive project details
6. **Don't** initialize with README (you already have one)
7. Click "Create Repository"

### 3. Connect and Push

```bash
# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main

# Or if using master branch
git push -u origin master
```

## ⚠️ Important Warnings

### 1. **Never Commit These:**
- Real database passwords
- API keys
- JWT secrets
- `.env` files with real credentials
- Personal information

### 2. **If You Accidentally Commit Secrets:**

```bash
# Remove file from git history
git rm --cached sensitive-file.txt

# Or use git filter-branch (more complex)
# Or use tools like BFG Repo-Cleaner
```

Better: **Create a new repository and push only clean code**

### 3. **Public vs Private Repository**

- **Private:** Recommended for learning projects with credentials
- **Public:** Only if you're 100% sure no secrets are included

## 📋 Post-Push Checklist

After pushing to GitHub:

- [ ] Verify repository on GitHub.com
- [ ] Check files are properly uploaded
- [ ] Verify `.env` is NOT visible
- [ ] Test cloning in a new directory
- [ ] Verify application works after cloning
- [ ] Update README with your GitHub URL
- [ ] Add GitHub repository URL to your project report

## 🎓 For Your Project Report

After pushing, include in your report:
- **GitHub URL:** `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
- **Number of commits:** (check with `git log --oneline | wc -l`)
- **Lines of code:** (check with tools like `cloc`)
- **Technologies used:** Listed in README.md

## 🔗 Useful Git Commands

```bash
# Check what's ignored
git status --ignored

# See commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create a new branch
git checkout -b feature/new-feature

# Push branch to GitHub
git push origin feature/new-feature
```

## ✅ Final Security Verification

Before pushing, run:

```bash
# Make sure .env is ignored
git check-ignore .env
# Should output: .env

# Make sure application.properties doesn't contain password
grep -i "laknight07" SpringEcom/src/main/resources/application.properties
# Should return: nothing (exit code 1)
```

## 🎯 Ready to Push?

If all boxes are checked above, you're ready to push! 

```bash
git init
git add .
git commit -m "Initial commit: Full-stack e-commerce platform"
git remote add origin <YOUR_GITHUB_URL>
git push -u origin main
```

---

**Remember:** Once pushed to GitHub, assume it's public forever (even if deleted). Always double-check for sensitive data!
