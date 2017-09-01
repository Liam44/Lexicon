using Lexicon.Extensions;
using Lexicon.Models;
using Lexicon.Models.Lexicon;
using Lexicon.Repositories;
using Lexicon.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SinglePageWebApplication.Controllers
{
    [Authorize]
    public class DocumentsController : ApiController
    {
        private DocumentsRepository repository = new DocumentsRepository();

        private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Uploads";

        public List<EnumDocumentClassesVM> GetDocumentClasses()
        {
            List<EnumDocumentClassesVM> result = new List<EnumDocumentClassesVM>();

            foreach (DocumentClass documentClass in Enum.GetValues(typeof(DocumentClass)))
            {
                result.Add(new EnumDocumentClassesVM { Key = documentClass, Value = documentClass.ToString() });
            }

            return result;
        }

        /// <summary>
        /// Delete a document
        /// </summary>
        /// <param name="id">Document ID</param>
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

                var result = new DocumentActionResult
                {
                    Successful = true,
                    Message = document.Name + " deleted successfully"
                };
                return Ok(new { message = result.Message });
            }
            catch (Exception ex)
            {
                var result = new DocumentActionResult
                {
                    Successful = false,
                    Message = "error deleting fileName " + ex.GetBaseException().Message
                };
                return BadRequest(result.Message);
            }
        }

        /// <summary>
        /// Uploads a document
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
                // Copies the uploaded files to the "Uploads" repository in the project
                var provider = new CustomMultipartFormDataStreamProvider(workingFolder);
                await Task.Run(async () => await Request.Content.ReadAsMultipartAsync(provider));

                foreach (var file in provider.FileData)
                {
                    var fileInfo = new FileInfo(file.LocalFileName);

                    Document document = new Document
                    {
                        Name = fileInfo.Name,
                        UploadingDate = DateTime.Now,
                        UploaderID = User.Identity.GetUserId(),
                        Class = (DocumentClass)(int.Parse(provider.FormData["DocumentClass"])),
                        ContentType = MimeMapping.GetMimeMapping(file.LocalFileName)
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

                    document.Content = File.ReadAllBytes(file.LocalFileName);

                    fileInfo.Delete();

                    await repository.Add(document);
                }
                return Ok(new { Message = "Documents uploaded ok" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.GetBaseException().Message);
            }
        }

        [HttpGet]
        public async Task<HttpResponseMessage> Download(int fileID)
        {
            //Get file object here
            try
            {
                var fetchFile = await repository.Document(fileID);

                HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
                httpResponseMessage.Content = new ByteArrayContent(fetchFile.Content);
                httpResponseMessage.Content.Headers.Add("x-filename", fetchFile.Name);
                httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue(fetchFile.ContentType);
                httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                httpResponseMessage.Content.Headers.ContentDisposition.FileName = fetchFile.Name;
                httpResponseMessage.StatusCode = HttpStatusCode.OK;

                return httpResponseMessage;
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
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