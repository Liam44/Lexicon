using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace SinglePageWebApplication.Controllers
{
    [Authorize]
    public class MessagesController : ApiController
    {
        private MessagesRepository repository = new MessagesRepository();

        // GET: api/SentMessages
        public IEnumerable<PartialMessageVM> GetSentMessages()
        {
            return repository.SentMessages(User.Identity.GetUserId())
                             .Select(m => new PartialMessageVM
                             {
                                 ID = m.ID,
                                 Subject = m.Subject,
                                 Content = m.Content,
                                 To = m.To.ToString(),
                                 SendingDate = m.Date.ToString(),
                                 ReadingDate = m.ReadingDate == null ? null : m.ReadingDate.ToString()
                             })
                             .OrderByDescending(m => m.SendingDate);
        }

        // GET: api/ReceivedMessages
        public IEnumerable<PartialMessageVM> GetReceivedMessages()
        {
            return repository.ReceivedMessages(User.Identity.GetUserId())
                             .Select(m => new PartialMessageVM
                             {
                                 ID = m.ID,
                                 Subject = m.Subject,
                                 Content = m.Content,
                                 From = m.From.ToString(),
                                 SendingDate = m.Date.ToString(),
                                 ReadingDate = m.ReadingDate == null ? null : m.ReadingDate.ToString()
                             })
                             .OrderByDescending(m => DateTime.Equals(m.ReadingDate, null))
                             .ThenByDescending(m => m.SendingDate);
        }

        // GET: api/Messages/5
        [ResponseType(typeof(PartialMessageVM))]
        public async Task<IHttpActionResult> GetMessage(int id)
        {
            Message message = await repository.Message(id);
            if (message == null)
            {
                return NotFound();
            }

            string currentUserId = User.Identity.GetUserId();

            // When the message is opened, the reading date is set to the current date,
            // as long as it hasn't been read yet!
            if (message.ToID == currentUserId && message.ReadingDate == null)
            {
                message.ReadingDate = DateTime.Now;
                await repository.Edit(id, message);
            }

            return Ok(new PartialMessageVM
            {
                ID = message.ID,
                Subject = message.Subject,
                Content = message.Content,
                From = message.From.ToString(),
                FromID = message.FromID,
                To = message.ToID == currentUserId ? string.Empty : message.To.ToString(),
                SendingDate = message.Date.ToString(),
                ReadingDate = message.ReadingDate.ToString(),
                AnswerToID = message.AnswerToID
            });
        }

        // GET: api/Messages/5
        [ResponseType(typeof(IEnumerable<PartialMessageVM>))]
        public async Task<IHttpActionResult> GetAnswers(int id)
        {
            Message message = await repository.Message(id);
            if (message == null)
            {
                return NotFound();
            }

            // Going up in history in order to find the initial message
            while (message.AnswerToID != null)
            {
                message = await repository.Message(message.AnswerToID);
            }

            return Ok(GetAnswers(message));
        }

        // GET: api/Messages/5
        [ResponseType(typeof(string))]
        public IHttpActionResult GetAmountUnreadMessages()
        {
            int intAmountUnreadMessages = repository.ReceivedMessages(User.Identity.GetUserId())
                                                    .Where(m => m.ReadingDate == null)
                                                    .Count();

            string strAmountUnreadMessages = string.Empty;

            if (intAmountUnreadMessages > 0)
                strAmountUnreadMessages = " (" + intAmountUnreadMessages.ToString() + ")";

            return Ok(strAmountUnreadMessages);
        }

        // POST: api/Messages
        [ResponseType(typeof(Message))]
        public async Task<IHttpActionResult> PostMessage(PartialMessageVM partialMessage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            partialMessage.Content = partialMessage.Content.Replace("\n", "<br />");

            Message message = new Message
            {
                Subject = partialMessage.Subject,
                Content = partialMessage.Content,
                FromID = User.Identity.GetUserId(),
                ToID = partialMessage.ToID,
                Date = DateTime.Now,
                AnswerToID = partialMessage.AnswerToID
            };

            await repository.Add(message);

            return CreatedAtRoute("DefaultApi", new { id = message.ID }, message);
        }

        private List<PartialMessageVM> GetAnswers(Message message, int level = 0)
        {
            List<PartialMessageVM> result = new List<PartialMessageVM> {
                new PartialMessageVM {
                ID = message.ID,
                Subject = message.Subject,
                Content = message.Content,
                From = message.From.ToString(),
                FromID = message.FromID == User.Identity.GetUserId()? null: message.FromID,
                To = message.To.ToString(),
                SendingDate = message.Date.ToString(),
                Level = level
                } };

            level += 1;

            foreach (Message answer in message.Answers.OrderBy(a => a.Date))
            {
                result.AddRange(GetAnswers(answer, level));
            }

            return result;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}