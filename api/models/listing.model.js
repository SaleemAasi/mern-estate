import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true
        },
        regularprice: {
            type: Number,
            required: true,
            min: 0
        },
        discountPrice: {
            type: Number,
            min: 0
        },
        bathroom: {
            type: Number,
            required: true,
            min: 1
        },
        bedroom: {
            type: Number,
            required: true,
            min: 1
        },
        furnish: {
            type: Boolean,
            default: false
        },
        parking: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            required: true,
            enum: ["house", "apartment", "studio", "villa"]
        },
        offer: {
            type: Boolean,
            default: false
        },
        imageUrls: {
            type: [String],  // Enforce array of strings
            validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: "At least one image is required."
            },
            required: true
        },
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
