// import { v2 as cloudinary } from 'cloudinary';
// import { getCloudinaryPublicId } from './data-mappers';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Type definition for Cloudinary error
// interface CloudinaryError {
//   http_code?: number;
//   message?: string;
// }

// export async function uploadFile(file: string, folder: string): Promise<string> {
//   try {
//     // Environment variables for debugging
//     console.log("Using Cloudinary config:", {
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key_exists: !!process.env.CLOUDINARY_API_KEY,
//       api_secret_exists: !!process.env.CLOUDINARY_API_SECRET
//     });

//     // Add size check (approximate for base64 string)
//     const base64Size = file.length * 0.75; // Approximate size in bytes
//     if (base64Size > 10 * 1024 * 1024) { // 10MB limit
//       throw new Error('File too large to upload');
//     }
    
//     const result = await cloudinary.uploader.upload(file, {
//       folder: folder,
//       resource_type: 'auto', // Auto-detect file type
//       quality: 'auto', // Auto-optimize images
//       fetch_format: 'auto' // Auto-select best format
//     });
    
//     return result.secure_url;
//   } catch (error: unknown) {
//     console.error('Error uploading file to Cloudinary:', error);
    
//     // More detailed error for debugging
//     if (error instanceof Error) {
//       console.error('Error details:', error.message);
//     }
    
//     // Handle specific Cloudinary errors - with proper type checking
//     const cloudinaryError = error as CloudinaryError;
//     if (typeof cloudinaryError === 'object' && 
//         cloudinaryError !== null && 
//         'http_code' in cloudinaryError && 
//         cloudinaryError.http_code === 413) {
//       throw new Error('File is too large for upload (max 10MB)');
//     }
    
//     throw new Error('Failed to upload file');
//   }
// }

// // Rest of the file remains unchanged
// export async function deleteFromCloudinary(publicId: string) {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error("Error deleting from Cloudinary:", error);
//     throw new Error("Failed to delete file from Cloudinary");
//   }
// }


// export async function getCloudinaryFileInfo(url: string) {
//   try {
//     const publicId = getCloudinaryPublicId(url);
//     if (!publicId) return null;
    
//     const result = await cloudinary.api.resource(publicId);
//     return result;
//   } catch (error) {
//     console.error("Error getting Cloudinary file info:", error);
//     return null;
//   }
// }

// export async function generateCloudinaryDownloadUrl(url: string) {
//   try {
//     const publicId = getCloudinaryPublicId(url);
//     if (!publicId) return url;
    
//     return cloudinary.url(publicId, {
//       flags: "attachment",
//       sign_url: true,
//       secure: true,
//     });
//   } catch (error) {
//     console.error("Error generating Cloudinary download URL:", error);
//     return url;
//   }
// }

// export function getFileTypeInfo(url: string) {
//   if (!url) return { type: 'unknown', icon: 'file', label: 'Unknown' };
  
//   const extension = url.split('.').pop()?.toLowerCase();
  
//   switch (extension) {
//     case 'pdf':
//       return { type: 'pdf', icon: 'file-text', label: 'PDF Document' };
//     case 'jpg':
//     case 'jpeg':
//     case 'png':
//     case 'gif':
//     case 'webp':
//       return { type: 'image', icon: 'image', label: 'Image' };
//     case 'doc':
//     case 'docx':
//       return { type: 'word', icon: 'file-text', label: 'Word Document' };
//     case 'xls':
//     case 'xlsx':
//       return { type: 'excel', icon: 'table', label: 'Excel Spreadsheet' };
//     case 'ppt':
//     case 'pptx':
//       return { type: 'powerpoint', icon: 'layout', label: 'PowerPoint' };
//     default:
//       return { type: 'other', icon: 'file', label: 'Document' };
//   }
// }

// export function enhanceCloudinaryUrl(url: string, options: any = {}) {
//   if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
//     return url;
//   }
  
//   try {
//     const parts = url.split('/upload/');
    
//     if (parts.length !== 2) return url;
    
//     let transformations = '';
//     if (options.download) {
//       transformations += 'fl_attachment/';
//     }
    
//     if (options.format) {
//       transformations += `f_${options.format}/`;
//     }
    
//     return `${parts[0]}/upload/${transformations}${parts[1]}`;
//   } catch (error) {
//     console.error("Error enhancing Cloudinary URL:", error);
//     return url;
//   }
// }

// export default cloudinary;
import { v2 as cloudinary } from 'cloudinary';
import { getCloudinaryPublicId } from './data-mappers';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Type definition for Cloudinary error
interface CloudinaryError {
  http_code?: number;
  message?: string;
}

export async function uploadFile(file: string, folder: string): Promise<string> {
  try {
    // Environment variables for debugging
    console.log("Using Cloudinary config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key_exists: !!process.env.CLOUDINARY_API_KEY,
      api_secret_exists: !!process.env.CLOUDINARY_API_SECRET
    });

    // Add size check (approximate for base64 string)
    const base64Size = file.length * 0.75; // Approximate size in bytes
    if (base64Size > 10 * 1024 * 1024) { // 10MB limit
      throw new Error('File too large to upload');
    }
    
    // Detect if file is a PDF
    const isPdf = 
      file.includes('data:application/pdf') || 
      file.toLowerCase().includes('.pdf;base64') ||
      file.toLowerCase().includes('pdf');
    
    console.log(`Uploading file. PDF detected: ${isPdf ? 'Yes' : 'No'}`);
    
    // Use the raw_format preset for PDFs and raw files
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      // Use the custom preset for PDFs
      upload_preset: isPdf ? "raw_format" : undefined,
      // Use raw for PDFs, auto for everything else
      resource_type: isPdf ? "raw" : "auto",
      // Only apply these settings for non-PDFs
      quality: isPdf ? undefined : 'auto',
      fetch_format: isPdf ? undefined : 'auto'
    });
    
    console.log(`File uploaded as: ${result.resource_type}, format: ${result.format || 'raw'}`);
    return result.secure_url;
  } catch (error: unknown) {
    console.error('Error uploading file to Cloudinary:', error);
    
    // More detailed error for debugging
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    
    // Handle specific Cloudinary errors with proper type checking and better error messages
    const cloudinaryError = error as CloudinaryError;
    if (typeof cloudinaryError === 'object' && cloudinaryError !== null && 'http_code' in cloudinaryError) {
      // Specific HTTP error codes
      switch (cloudinaryError.http_code) {
        case 400:
          throw new Error(`Invalid file format or corrupt file: ${cloudinaryError.message || ''}`);
        case 413:
          throw new Error('File is too large for upload (max 10MB)');
        case 401:
          throw new Error('Authentication failed - check Cloudinary credentials');
        case 403:
          throw new Error('Not authorized to upload to this folder');
        default:
          throw new Error(`Cloudinary error (${cloudinaryError.http_code}): ${cloudinaryError.message || 'Unknown error'}`);
      }
    }
    
    // Generic error if not a Cloudinary specific error
    throw new Error('Failed to upload file to Cloudinary');
  }
}

// Rest of the file remains unchanged
export async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
}

export async function getCloudinaryFileInfo(url: string) {
  try {
    const publicId = getCloudinaryPublicId(url);
    if (!publicId) return null;
    
    // Determine if this is a PDF document
    const isPdf = url.toLowerCase().includes('.pdf');
    
    // Try with the expected resource type first
    try {
      const result = await cloudinary.api.resource(publicId, {
        resource_type: isPdf ? "raw" : "image"
      });
      return result;
    } catch (firstError) {
      // If first attempt fails and it's a PDF, try the alternative type
      if (isPdf) {
        try {
          const result = await cloudinary.api.resource(publicId, {
            resource_type: "image"
          });
          return result;
        } catch (secondError) {
          console.error("Error fetching PDF resource:", secondError);
        }
      }
      console.error("Error fetching resource:", firstError);
      return null;
    }
  } catch (error) {
    console.error("Error getting Cloudinary file info:", error);
    return null;
  }
}

export async function generateCloudinaryDownloadUrl(url: string) {
  try {
    const publicId = getCloudinaryPublicId(url);
    if (!publicId) return url;
    
    return cloudinary.url(publicId, {
      flags: "attachment",
      sign_url: true,
      secure: true,
    });
  } catch (error) {
    console.error("Error generating Cloudinary download URL:", error);
    return url;
  }
}

export function getFileTypeInfo(url: string) {
  if (!url) return { type: 'unknown', icon: 'file', label: 'Unknown' };
  
  const extension = url.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return { type: 'pdf', icon: 'file-text', label: 'PDF Document' };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return { type: 'image', icon: 'image', label: 'Image' };
    case 'doc':
    case 'docx':
      return { type: 'word', icon: 'file-text', label: 'Word Document' };
    case 'xls':
    case 'xlsx':
      return { type: 'excel', icon: 'table', label: 'Excel Spreadsheet' };
    case 'ppt':
    case 'pptx':
      return { type: 'powerpoint', icon: 'layout', label: 'PowerPoint' };
    default:
      return { type: 'other', icon: 'file', label: 'Document' };
  }
}

export function enhanceCloudinaryUrl(url: string, options: any = {}) {
  if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }
  
  try {
    const parts = url.split('/upload/');
    
    if (parts.length !== 2) return url;
    
    let transformations = '';
    if (options.download) {
      transformations += 'fl_attachment/';
    }
    
    if (options.format) {
      transformations += `f_${options.format}/`;
    }
    
    return `${parts[0]}/upload/${transformations}${parts[1]}`;
  } catch (error) {
    console.error("Error enhancing Cloudinary URL:", error);
    return url;
  }
}

export default cloudinary;