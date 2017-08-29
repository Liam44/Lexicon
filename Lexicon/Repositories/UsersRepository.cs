using Lexicon.Models;
using Lexicon.Models.Lexicon;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace Lexicon.Repositories
{
    public class UsersRepository : IDisposable
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        public async Task<User> GetUserById(string id)
        {
            return await GetUsers().FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await GetUsers().FirstOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<User> GetUserByAFID(string afid)
        {
            return await GetUsers().FirstOrDefaultAsync(u => u.AFId == afid);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await GetUsers().FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task Add(User user)
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();
        }

        public async Task<bool> Edit(string id, User user)
        {
            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();

                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task Delete(User user)
        {
            db.Users.Remove(user);
            await db.SaveChangesAsync();
        }

        /// <summary>
        /// Allows the user to change their password or reset someone else's password
        /// </summary>
        /// <param name="userId">User ID which password is to be changed</param>
        /// <param name="newPassword">New password, or if empty, default password</param>
        /// <returns></returns>
        public async Task<IdentityResult> ChangePassword(string userId, string newPassword = "")
        {
            try
            {
                User user = await GetUserById(userId);
                if (user != null)
                {
                    UserStore<User> store = new UserStore<User>(db);
                    UserManager<User> userManager = new UserManager<User>(store);

                    if (newPassword.Length == 0)
                        newPassword = RoleConstants.Password(user.Role);

                    string hashedNewPassword = userManager.PasswordHasher.HashPassword(newPassword);
                    await store.SetPasswordHashAsync(user, hashedNewPassword);
                    await store.UpdateAsync(user);
                }

                return IdentityResult.Success;
            }
            catch (Exception ex)
            {
                return IdentityResult.Failed(ex.Message);
            }
        }

        private bool UserExists(string id)
        {
            return db.Users.Count(u => u.Id == id) > 0;
        }

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                db.Dispose();
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
        }
        #endregion
    }
}