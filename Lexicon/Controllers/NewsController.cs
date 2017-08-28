using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace Lexicon.Controllers
{
    [Authorize]
    public class NewsController : ApiController
    {
        private NewsRepository repository = new NewsRepository();

        // GET: api/News
        public IQueryable<News> GetNews()
        {
            return repository.GetNews();
        }

        // GET: api/News/5
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> GetNews(int id)
        {
            News news = await repository.GetNews(id);
            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);
        }

        // PUT: api/News/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNews(int id, News news)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != news.ID)
            {
                return BadRequest();
            }

            if (await repository.Edit(id, news))
                return StatusCode(HttpStatusCode.NoContent);
            else
                return NotFound();
        }

        // POST: api/News
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> PostNews(News news)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await repository.Add(news);

            return CreatedAtRoute("DefaultApi", new { id = news.ID }, news);
        }

        // DELETE: api/News/5
        [ResponseType(typeof(News))]
        public async Task<IHttpActionResult> DeleteNews(int id)
        {
            News news = await repository.GetNews(id);
            if (news == null)
            {
                return NotFound();
            }

            await repository.Delete(news);

            return Ok(news);
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