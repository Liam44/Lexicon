using Lexicon.Extensions;
using Lexicon.Models;
using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace SinglePageWebApplication.Controllers
{
    [Authorize]
    public class DocumentsController : ApiController
    {
        private DocumentsRepository repository = new DocumentsRepository();

        public List<EnumDocumentClassesVM> GetDocumentClasses()
        {
            List<EnumDocumentClassesVM> result = new List<EnumDocumentClassesVM>();

            foreach (DocumentClass documentClass in Enum.GetValues(typeof(DocumentClass)))
            {
                result.Add(new EnumDocumentClassesVM { Key = documentClass, Value = documentClass.ToString() });
            }

            return result;
        }

        // GET: api/Document/5
        [ResponseType(typeof(PartialDocumentVM))]
        public async Task<IHttpActionResult> GetDocument(int id)
        {
            Document document = await repository.Document(id);
            if (document == null)
            {
                return NotFound();
            }

            return Ok(new PartialDocumentVM
            {
                ID = document.ID,
                Name = document.Name,
                CourseID = document.CourseID,
                CourseDayID = document.CourseDayID,
                CoursePartID = document.CoursePartID,
                AssignmentID = document.AssignmentID
            });
        }

        // POST: api/Documents
        public HttpResponseMessage Post()
        {
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);

                    docfiles.Add(filePath);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }

        [HttpGet]
        public HttpResponseMessage DownLoadFile(string FileName, string fileType)
        {
            Byte[] bytes = null;
            if (FileName != null)
            {
                string filePath = Path.GetFullPath(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.InternetCache), FileName));
                FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                BinaryReader br = new BinaryReader(fs);
                bytes = br.ReadBytes((Int32)fs.Length);
                br.Close();
                fs.Close();
            }

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            System.IO.MemoryStream stream = new MemoryStream(bytes);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue(fileType);
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = FileName
            };
            return (result);
        }

        // DELETE: api/Document/5
        [ResponseType(typeof(Document))]
        public async Task<IHttpActionResult> DeleteDocument(int id)
        {
            Document document = await repository.Document(id);
            if (document == null)
            {
                return NotFound();
            }

            await repository.Delete(document);

            return Ok(document);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                repository.Dispose();
            }
            base.Dispose(disposing);
        }

        private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Uploads";

        /// <summary>
        ///   Get all photos
        /// </summary>
        /// <returns></returns>
        public async Task<IHttpActionResult> Get()
        {
            var documents = new List<PartialDocumentVM>();

            var photoFolder = new DirectoryInfo(workingFolder);

            await Task.Factory.StartNew(() =>
            {
                documents = PartialDocuments(repository.Documents());
            });

            return Ok(new { Documents = documents });
        }

        /// <summary>
        ///   Delete photo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            Document document = await repository.Document(id);

            if (document == null)
            {
                return NotFound();
            }

            try
            {
                await repository.Delete(document);

                var result = new PhotoActionResult
                {
                    Successful = true,
                    Message = document.Name + " deleted successfully"
                };
                return Ok(new { message = result.Message });
            }
            catch (Exception ex)
            {
                var result = new PhotoActionResult
                {
                    Successful = false,
                    Message = "error deleting fileName " + ex.GetBaseException().Message
                };
                return BadRequest(result.Message);
            }
        }

        /// <summary>
        ///   Add a photo
        /// </summary>
        /// <returns></returns>
        public async Task<IHttpActionResult> Upload()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent("form-data"))
            {
                return BadRequest("Unsupported media type");
            }
            try
            {
                var provider = new CustomMultipartFormDataStreamProvider(workingFolder);
                //await Request.Content.ReadAsMultipartAsync(provider);
                await Task.Run(async () => await Request.Content.ReadAsMultipartAsync(provider));

                var documents = new List<Document>();

                foreach (var file in provider.FileData)
                {
                    var fileInfo = new FileInfo(file.LocalFileName);

                    Document document = new Document
                    {
                        Name = fileInfo.Name,
                        UploadingDate = DateTime.Now,
                        UploaderID = User.Identity.GetUserId(),
                        Class = (DocumentClass)(int.Parse(provider.FormData["DocumentClass"])),
                    };

                    string strCourseId = provider.FormData["CourseID"];

                    if (strCourseId != null)
                    {
                        document.CourseID = int.Parse(strCourseId);
                    }

                    string strCourseDayId = provider.FormData["CourseDayID"];

                    if (strCourseDayId != null)
                    {
                        document.CourseDayID = int.Parse(strCourseDayId);
                    }

                    string strCoursePartId = provider.FormData["CoursePartID"];

                    if (strCoursePartId != null)
                    {
                        document.CoursePartID = int.Parse(strCoursePartId);
                    }

                    string strAssignmentId = provider.FormData["AssignmentID"];

                    if (strAssignmentId != null)
                    {
                        document.AssignmentID = int.Parse(strAssignmentId);
                    }

                    await repository.Add(document);

                    documents.Add(document);

                    fileInfo.Delete();
                }
                return Ok(new { Message = "Documents uploaded ok", Documents = PartialDocuments(documents) });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }

        private List<PartialDocumentVM> PartialDocuments(IEnumerable<Document> documents)
        {
            return documents.Select(d => new PartialDocumentVM
            {
                ID = d.ID,
                CourseID = d.CourseID,
                CourseDayID = d.CourseDayID,
                CoursePartID = d.CoursePartID,
                AssignmentID = d.AssignmentID,
                Name = d.Name,
                Uploaded = d.UploadingDate.ToString(),
                DocumentClass = d.Class.ToString()
            }).ToList();
        }
    }
}