#!/usr/bin/env bash
# 全 git worktree を origin/main に一括整列する。
# - main ブランチの worktree は merge --ff-only（非破壊）
# - claude/* など使い捨て worktree は reset --hard origin/main
# - 未コミット変更のある worktree は SKIP（壊さない）
# 注意: worktree を持たない bare ブランチ（例 claude/nifty-*）は触らない。
set -uo pipefail

git fetch origin --prune

path=""
while IFS= read -r line; do
  case "$line" in
    "worktree "*)
      path="${line#worktree }"
      ;;
    "branch "*)
      ref="${line#branch }"
      branch="${ref#refs/heads/}"
      if [ -n "$(git -C "$path" status --porcelain)" ]; then
        echo "SKIP  (dirty)   $branch  ($path)"
      elif [ "$branch" = "main" ]; then
        if git -C "$path" merge --ff-only origin/main >/dev/null 2>&1; then
          echo "ff    main      -> $(git -C "$path" rev-parse --short HEAD)"
        else
          echo "WARN  main not fast-forwardable ($path) — 手動確認"
        fi
      else
        git -C "$path" reset --hard origin/main >/dev/null 2>&1 \
          && echo "reset $branch  -> $(git -C "$path" rev-parse --short HEAD)"
      fi
      ;;
    "detached")
      echo "SKIP  (detached) ($path)"
      ;;
  esac
done < <(git worktree list --porcelain)
