using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Domain
{
    public class ResetPassword
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }
        

        [Required]
        [Compare("Password", ErrorMessage = "Passwords Do Not Match")]
        public string ConfirmPassword { get; set; }
        
    }
}
